export const roles = [
  'DevOps Engineer',
  'SRE Engineer',
  'Cloud Infrastructure Architect',
  'GitOps Specialist',
]

export const stats = [
  { value: 40, suffix: '%', label: 'Faster Deployments' },
  { value: 30, suffix: '%', prefix: '15–', label: 'Cloud Cost Reduction' },
  { value: 50, suffix: '%', label: 'Improvement in Deployment Stability' },
  { value: 40, suffix: '%', prefix: '30–', label: 'Faster Incident Resolution (MTTR)' },
]

export const competencies = [
  {
    category: 'Cloud Platforms',
    color: 'cyan',
    skills: [
      'AWS (EKS, EC2, VPC, S3, IAM)',
      'Azure (AKS, VNet, Key Vault, Pipelines)',
      'GCP (GKE, Compute Engine, Load Balancing)',
    ],
  },
  {
    category: 'Kubernetes & Containers',
    color: 'purple',
    skills: [
      'Kubernetes Administration',
      'EKS / AKS / GKE',
      'Helm',
      'ArgoCD',
      'HPA / VPA',
      'RBAC',
      'Ingress',
      'Docker',
      'Private Registries',
    ],
  },
  {
    category: 'CI/CD & GitOps',
    color: 'lime',
    skills: [
      'GitHub Actions',
      'Azure Pipelines',
      'Jenkins',
      'ArgoCD',
      'Blue-Green & Canary Deployments',
      'GitOps Workflows',
    ],
  },
  {
    category: 'IaC & Automation',
    color: 'cyan',
    skills: ['Terraform', 'ARM Templates', 'Ansible', 'CloudFormation', 'Python', 'Bash'],
  },
  {
    category: 'Observability & SRE',
    color: 'purple',
    skills: [
      'Prometheus',
      'Grafana',
      'ELK Stack',
      'Alert Management',
      'Custom Dashboards',
      'Incident Response',
    ],
  },
  {
    category: 'Security',
    color: 'lime',
    skills: [
      'IAM / RBAC',
      'Secrets Management',
      'Container Image Scanning',
      'Compliance Automation',
    ],
  },
]

export const experience = [
  {
    role: 'DevOps-SRE Engineer',
    company: 'Increff',
    period: 'Dec 2024 – Present',
    points: [
      'Architected and led enterprise-wide GitOps workflows using ArgoCD on GCP/GKE, establishing declarative, fully auditable deployment processes across multiple client environments.',
      'Owned modernization of CI/CD infrastructure end-to-end, reducing deployment time by 40% while sustaining 99.9%+ platform stability.',
      'Designed and scaled containerized applications on GKE with optimized horizontal/vertical autoscaling for dynamic, high-traffic workloads.',
      'Engineered multi-client sprint release pipelines enabling weekly production updates with zero unplanned downtime.',
      'Drove container workload right-sizing initiatives, achieving 20–25% cloud cost reduction without compromising performance or reliability.',
    ],
  },
  {
    role: 'DevOps Engineer',
    company: 'Mastec Quadgen',
    period: 'Sep 2022 – Dec 2024',
    points: [
      'Architected end-to-end CI/CD pipelines using Azure DevOps, automating build/test/release workflows.',
      'Implemented Terraform IaC strategy achieving 100% reproducible infrastructure and 70% reduction in setup time.',
      'Designed comprehensive K8s manifests (Deployments, StatefulSets, Ingress, PV/PVC) with optimized resource allocation.',
      'Established private Docker registries with secure image storage, scanning, and compliance automation.',
      'Architected Prometheus/Grafana monitoring stack with 20+ custom dashboards.',
      'Drove 15–30% cloud cost savings through optimization and right-sizing initiatives.',
    ],
  },
]

export const projects = [
  {
    title: 'Enterprise GitOps Transformation',
    stack: 'GCP, ArgoCD, Kubernetes',
    description: 'Deployed GitOps infrastructure enabling multi-client releases with 40% faster deployments.',
    color: 'cyan',
  },
  {
    title: 'Kubernetes Multi-tenant Architecture',
    stack: 'Kubeadm, RBAC, Helm',
    description: 'Designed clusters supporting 50+ microservices with 35% improved resource utilization and secure workload isolation.',
    color: 'purple',
  },
  {
    title: 'Infrastructure-as-Code Migration',
    stack: 'Terraform, AWS/Azure/GCP',
    description: 'Automated infrastructure provisioning eliminating drift, reducing setup from weeks to minutes.',
    color: 'lime',
  },
  {
    title: 'Observability Platform',
    stack: 'Prometheus, Grafana',
    description: 'Built monitoring stack with 20+ dashboards improving MTTR by 30–40% through proactive detection.',
    color: 'cyan',
  },
  {
    title: 'Private Docker Registry',
    stack: 'Docker, Security Scanning',
    description: 'Implemented secure registry with vulnerability assessment, reducing image sizes by 40–50%.',
    color: 'purple',
  },
]

export const achievements = [
  {
    icon: '🏆',
    title: 'Spot Award',
    subtitle: 'Outstanding Performance in Automation Deployment',
    description: 'Exceptional contribution automating critical infrastructure workflows.',
  },
  {
    icon: '📜',
    title: 'Microsoft Certified: Azure Administrator',
    subtitle: 'Microsoft',
    description: '',
  },
  {
    icon: '📜',
    title: 'Microsoft Certified: Azure Fundamentals',
    subtitle: 'Microsoft',
    description: '',
  },
  {
    icon: '📜',
    title: 'Red Hat Certified System Administrator (RHCSA)',
    subtitle: 'Red Hat',
    description: '',
  },
]

export const achievementBadges = [
  { icon: '🟩', label: 'Hack The Box' },
  { icon: '🥷', label: 'SNA Labs', subtitle: 'Selfmade Ninja Labs' },
  { icon: '💻', label: 'HackerRank' },
  { icon: '☁️', label: 'Google Cloud Skills Boost' },
  { icon: '🔷', label: 'Microsoft Azure', subtitle: 'Profile' },
]

export const certificationBadges = [
  { icon: '🔷', label: 'Azure' },
  { icon: '🎩', label: 'Red Hat' },
]

export const education = {
  degree: 'Bachelor of Engineering – Computer Science',
  school: 'KPR Institute of Engineering and Technology',
  period: '2018 – 2022',
}

export const contact = {
  phone: '+91 9876543210',
  email: 'tamilbecse139@gmail.com',
  linkedin: 'gtamilvanan17',
  linkedinUrl: 'https://linkedin.com/in/gtamilvanan17',
  github: 'gtamilvanan17',
  githubUrl: 'https://github.com/gtamilvanan17',
}
