// Tool logos. Brand logos come from devicon / simple-icons on jsDelivr (pinned);
// concepts without a brand get a small inline glyph.
const DEV = 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons';
const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@16.35.0/icons';

const dev = (p) => ({ src: `${DEV}/${p}.svg` });
const si = (n, color) => ({ mask: `${SI}/${n}.svg`, color });
const glyph = (path) => ({ svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>` });

const K8S = dev('kubernetes/kubernetes-original');
const AWS = dev('amazonwebservices/amazonwebservices-original-wordmark');
const GCP = dev('googlecloud/googlecloud-original');
const AZURE = dev('azure/azure-original');

const G = {
  network: glyph('<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-3h14v3"/>'),
  lock: glyph('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  key: glyph('<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>'),
  shield: glyph('<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>'),
  brain: glyph('<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>'),
  docs: glyph('<path d="M4 4h10l6 6v10H4z"/><path d="M14 4v6h6M8 14h8M8 18h5"/>'),
  scan: glyph('<path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3M7 12h10"/>'),
  box: glyph('<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>'),
};

export const ICONS = {
  // clouds
  AWS, GCP, Azure: AZURE,
  EKS: AWS, EC2: AWS, S3: AWS, CloudFormation: AWS,
  GKE: GCP, 'Secret Manager': GCP, 'Compute Engine': GCP,
  AKS: AZURE, 'Key Vault': AZURE, ARM: AZURE, 'ARM Templates': AZURE, VNet: AZURE,
  // kubernetes & containers
  Kubernetes: K8S, Kubeadm: K8S, 'HPA/VPA': K8S, Ingress: K8S, StatefulSets: K8S,
  Docker: dev('docker/docker-original'),
  'Private Registries': dev('docker/docker-original'),
  Helm: dev('helm/helm-original'),
  // ci/cd
  ArgoCD: dev('argocd/argocd-original'),
  'GitHub Actions': dev('githubactions/githubactions-original'),
  'Azure DevOps': dev('azuredevops/azuredevops-original'),
  'Azure Pipelines': dev('azuredevops/azuredevops-original'),
  Jenkins: dev('jenkins/jenkins-original'),
  GitOps: dev('git/git-original'),
  Git: dev('git/git-original'),
  // iac / scripting
  Terraform: dev('terraform/terraform-original'),
  Ansible: dev('ansible/ansible-original'),
  Python: dev('python/python-original'),
  Bash: dev('bash/bash-original'),
  Linux: dev('linux/linux-original'),
  YAML: dev('yaml/yaml-original'),
  // observability
  Prometheus: dev('prometheus/prometheus-original'),
  Grafana: dev('grafana/grafana-original'),
  ELK: dev('elasticsearch/elasticsearch-original'),
  // ml / ai
  GPU: si('nvidia', '#76B900'),
  'GPU Workloads': si('nvidia', '#76B900'),
  AIOps: G.brain,
  RAG: G.docs,
  'ML Inference': G.brain,
  // networking / security concepts
  VPC: G.network, VPCs: G.network, Subnets: G.network, 'Private Endpoints': G.network,
  IAM: G.key, RBAC: G.lock, 'Security Groups': G.shield, 'Secrets Mgmt': G.key,
  'Image Scanning': G.scan,
  // vendors
  'Red Hat': dev('redhat/redhat-original'),
  Microsoft: AZURE,
};

/** Build a logo tile element for a tool name, or null if unknown. */
export function logoEl(name) {
  const def = ICONS[name.trim()];
  if (!def) return null;
  const tile = document.createElement('i');
  tile.className = 'logo';
  tile.setAttribute('aria-hidden', 'true');
  if (def.src) {
    const img = document.createElement('img');
    img.src = def.src;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    tile.appendChild(img);
  } else if (def.mask) {
    const m = document.createElement('b');
    m.className = 'logo-mask';
    m.style.setProperty('--mask', `url(${def.mask})`);
    m.style.backgroundColor = def.color;
    tile.appendChild(m);
  } else {
    tile.classList.add('logo-glyph');
    tile.innerHTML = def.svg;
  }
  return tile;
}

/** Prepend a logo to every element matching `selector` whose text is a known tool. */
export function decorate(selector, root = document) {
  root.querySelectorAll(selector).forEach((el) => {
    if (el.querySelector('.logo')) return;
    const tile = logoEl(el.textContent);
    if (tile) el.prepend(tile);
  });
}
