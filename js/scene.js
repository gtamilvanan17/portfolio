// Three.js background: a living "cluster" — control-plane core, orbiting pods,
// traffic packets flowing to each pod, and a deep particle field.
import * as THREE from 'three';

export function initScene(canvas, { reduced = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    canvas.style.display = 'none';
    return { setTheme() {} };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 300);
  camera.position.set(0, 0, 20);

  const root = new THREE.Group();
  scene.add(root);

  // ---------- lights ----------
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  const key = new THREE.PointLight(0x3b82f6, 60, 60);
  key.position.set(6, 6, 10);
  const rim = new THREE.PointLight(0x22d3ee, 40, 60);
  rim.position.set(-8, -4, 6);
  scene.add(ambient, key, rim);

  // ---------- control-plane core ----------
  const core = new THREE.Group();
  root.add(core);
  const coreSolidMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, metalness: 0.7, roughness: 0.25, flatShading: true });
  const coreSolid = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), coreSolidMat);
  const coreWireMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.45 });
  const coreWire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.4, 1), coreWireMat);
  const shellMat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.07, transparent: true, opacity: 0.9 });
  const shell = new THREE.Points(new THREE.IcosahedronGeometry(3.1, 2), shellMat);
  core.add(coreSolid, coreWire, shell);

  // ---------- orbit rings ----------
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25 });
  const rings = [];
  const ringDefs = [
    { r: 5.2, tilt: [1.2, 0.2, 0] },
    { r: 6.8, tilt: [1.45, -0.5, 0.3] },
    { r: 8.4, tilt: [1.0, 0.6, -0.2] },
  ];
  ringDefs.forEach((d) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(d.r, 0.018, 8, 160), ringMat);
    ring.rotation.set(...d.tilt);
    root.add(ring);
    rings.push(ring);
  });

  // ---------- pods (nodes) ----------
  const podGeo = new THREE.BoxGeometry(0.62, 0.62, 0.62);
  const podEdgeGeo = new THREE.EdgesGeometry(podGeo);
  const podMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.5, roughness: 0.3, transparent: true, opacity: 0.85 });
  const podEdgeMat = new THREE.LineBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.9 });
  const pods = [];
  const PODS_PER_RING = [5, 6, 7];
  ringDefs.forEach((d, ri) => {
    const n = PODS_PER_RING[ri];
    for (let i = 0; i < n; i++) {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(podGeo, podMat));
      g.add(new THREE.LineSegments(podEdgeGeo, podEdgeMat));
      const s = 0.7 + Math.random() * 0.6;
      g.scale.setScalar(s);
      root.add(g);
      pods.push({
        g,
        ring: rings[ri],
        r: d.r,
        a: (i / n) * Math.PI * 2 + ri,
        speed: (0.12 + ri * 0.03) * (ri % 2 ? -1 : 1),
        spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.8),
        world: new THREE.Vector3(),
      });
    }
  });

  // ---------- links core → pods ----------
  const linkPositions = new Float32Array(pods.length * 6);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
  const linkMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.18 });
  const links = new THREE.LineSegments(linkGeo, linkMat);
  root.add(links);

  // ---------- packets (traffic) ----------
  const packetGeo = new THREE.SphereGeometry(0.08, 10, 10);
  const packetMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
  const packets = [];
  for (let i = 0; i < pods.length * 2; i++) {
    const m = new THREE.Mesh(packetGeo, packetMat);
    root.add(m);
    packets.push({ m, pod: pods[i % pods.length], t: Math.random(), v: 0.25 + Math.random() * 0.45 });
  }

  // ---------- particle field ----------
  const STARS = window.innerWidth < 700 ? 900 : 2200;
  const starPos = new Float32Array(STARS * 3);
  for (let i = 0; i < STARS; i++) {
    const r = 18 + Math.random() * 70;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    starPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    starPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    starPos[i * 3 + 2] = r * Math.cos(ph) - 20;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.12, transparent: true, opacity: 0.7, sizeAttenuation: true });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // ---------- floating hex "nodes" in the deep background ----------
  const hexMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.12 });
  const hexes = [];
  for (let i = 0; i < 9; i++) {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.3, 6), hexMat);
    h.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, -15 - Math.random() * 20);
    h.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    scene.add(h);
    hexes.push({ h, s: 0.1 + Math.random() * 0.3, o: Math.random() * 10 });
  }

  // ---------- interaction ----------
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  let scrollP = 0;   // 0..1 progress through the hero
  let scrollAll = 0; // 0..1 through the whole document
  const onScroll = () => {
    const h = window.innerHeight;
    scrollP = Math.min(window.scrollY / h, 1);
    const max = document.documentElement.scrollHeight - h;
    scrollAll = max > 0 ? window.scrollY / max : 0;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  let baseX = 0;
  let isMobile = false;
  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    isMobile = w < 1020;
    baseX = isMobile ? 0 : 5.6;
  };
  window.addEventListener('resize', resize);
  resize();

  // intro: scale from 0
  root.scale.setScalar(0.001);
  let intro = 0;

  // ---------- theme ----------
  function setTheme(theme) {
    const dark = theme === 'dark';
    coreSolidMat.color.set(dark ? 0x1e40af : 0x2563eb);
    coreSolidMat.emissive = new THREE.Color(dark ? 0x0b1f5c : 0x000000);
    coreWireMat.color.set(dark ? 0x60a5fa : 0x2563eb);
    coreWireMat.opacity = dark ? 0.45 : 0.35;
    shellMat.color.set(dark ? 0x22d3ee : 0x0ea5e9);
    ringMat.color.set(dark ? 0x60a5fa : 0x1d4ed8);
    ringMat.opacity = dark ? 0.28 : 0.2;
    podMat.color.set(dark ? 0x2563eb : 0x3b82f6);
    podMat.emissive.set(dark ? 0x1e3a8a : 0x2563eb);
    podMat.emissiveIntensity = dark ? 0.5 : 0.45;
    podEdgeMat.color.set(dark ? 0x93c5fd : 0x1e3a8a);
    linkMat.color.set(dark ? 0x60a5fa : 0x2563eb);
    linkMat.opacity = dark ? 0.2 : 0.16;
    packetMat.color.set(dark ? 0x22d3ee : 0x0ea5e9);
    starMat.color.set(dark ? 0x93c5fd : 0x2563eb);
    starMat.opacity = dark ? 0.75 : 0.45;
    starMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
    starMat.needsUpdate = true;
    hexMat.color.set(dark ? 0x3b82f6 : 0x1d4ed8);
    hexMat.opacity = dark ? 0.14 : 0.08;
    ambient.intensity = dark ? 0.35 : 0.9;
  }

  // ---------- loop ----------
  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3();
  const speed = reduced ? 0.25 : 1;

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05) * speed;
    const t = clock.elapsedTime * speed;

    intro = Math.min(intro + dt * 0.8, 1);
    const ease = 1 - Math.pow(1 - intro, 4);

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    // hero → background transition
    const p = scrollP;
    const targetX = baseX * (1 - p);
    root.position.x += (targetX - root.position.x) * 0.08;
    root.position.y += ((isMobile ? 1.5 : 0) * (1 - p) - root.position.y) * 0.08;
    const s = ease * (isMobile ? 0.6 : 1) * (1 - p * 0.25);
    root.scale.setScalar(Math.max(s, 0.001));
    root.rotation.y = t * 0.08 + mouse.x * 0.5 + scrollAll * Math.PI * 2;
    root.rotation.x = 0.25 + mouse.y * 0.3 + scrollAll * 0.8;
    camera.position.z = 20 + p * 6;
    canvas.style.opacity = String((isMobile ? 0.4 : 1) * (1 - p * 0.55));

    core.rotation.x += dt * 0.3;
    core.rotation.y += dt * 0.45;
    coreWire.rotation.z -= dt * 0.2;
    shell.rotation.y -= dt * 0.15;
    const pulse = 1 + Math.sin(t * 2) * 0.04;
    coreSolid.scale.setScalar(pulse);

    rings.forEach((r, i) => { r.rotation.z += dt * 0.05 * (i % 2 ? -1 : 1); });

    // pods ride their ring's local frame
    pods.forEach((pd, i) => {
      pd.a += dt * pd.speed;
      tmp.set(Math.cos(pd.a) * pd.r, Math.sin(pd.a) * pd.r, 0);
      tmp.applyEuler(pd.ring.rotation);
      pd.g.position.copy(tmp);
      pd.g.rotation.x += dt * pd.spin.x;
      pd.g.rotation.y += dt * pd.spin.y;
      pd.world.copy(tmp);
      linkPositions[i * 6 + 3] = tmp.x;
      linkPositions[i * 6 + 4] = tmp.y;
      linkPositions[i * 6 + 5] = tmp.z;
    });
    linkGeo.attributes.position.needsUpdate = true;

    packets.forEach((pk) => {
      pk.t += dt * pk.v;
      if (pk.t > 1) { pk.t = 0; pk.pod = pods[(Math.random() * pods.length) | 0]; }
      pk.m.position.copy(pk.pod.world).multiplyScalar(pk.t);
      const sc = Math.sin(pk.t * Math.PI);
      pk.m.scale.setScalar(0.4 + sc);
    });

    stars.rotation.y = t * 0.01 + mouse.x * 0.05;
    stars.rotation.x = mouse.y * 0.03 + scrollAll * 0.3;

    hexes.forEach((hx) => {
      hx.h.rotation.x += dt * hx.s * 0.5;
      hx.h.rotation.y += dt * hx.s;
      hx.h.position.y += Math.sin(t * 0.5 + hx.o) * 0.005;
    });

    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return { setTheme };
}
