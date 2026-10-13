// Snapshot of public profile stats — update by hand when they change.
// Last synced: 2026-10-13

export const HTB = {
  url: 'https://app.hackthebox.com/public/users/319478',
  handle: 'gtamilvanan17',
  level: 14,
  rank: 'Noob',
  rankIcon: 'https://htb-experience-prod-public-storage.s3.amazonaws.com/assets/ranks/svg/rank_beginner.svg',
  joined: 'May 2020',
  stats: [
    { label: 'challenges solved', value: 7, icon: 'flag' },
    { label: 'machines owned', value: 1, icon: 'server' },
    { label: 'respected by', value: 3, icon: 'heart' },
    { label: 'member since', value: 2020, plain: true, icon: 'calendar' },
  ],
  activity: [
    { flag: 'root', what: 'Keeper', type: 'machine', when: '3 years ago' },
    { flag: 'user', what: 'Keeper', type: 'machine', when: '3 years ago' },
    { flag: 'flag', what: 'Illumination', type: 'challenge', when: '5 years ago' },
    { flag: 'flag', what: 'The Secret of a Queen', type: 'challenge', when: '5 years ago' },
    { flag: 'flag', what: 'Baby RE', type: 'challenge', when: '5 years ago' },
  ],
};

// [title, earned]
const B = [
  ['Build a Certification Study Guide: ACE Exam Prep', '2024-09-11'],
  ['Reliable Google Cloud Infrastructure: Design and Process', '2024-09-10'],
  ['Prepare Data for ML APIs on Google Cloud', '2024-09-10'],
  ['Set Up an App Dev Environment on Google Cloud', '2024-09-10'],
  ['Implementing Cloud Load Balancing for Compute Engine', '2024-09-09'],
  ['Build a Secure Google Cloud Network', '2024-09-09'],
  ['Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud', '2024-09-09'],
  ['Google Cloud Computing Foundations: Networking & Security in Google Cloud', '2024-09-07'],
  ['Google Cloud Computing Foundations: Infrastructure in Google Cloud', '2024-09-07'],
  ['Google Cloud Fundamentals: Core Infrastructure', '2024-09-06'],
  ['Applied Data: Blockchain', '2024-09-05'],
  ['Google Cloud Computing Foundations: Cloud Computing Fundamentals', '2024-09-05'],
  ['Site Reliability Engineering: Measuring and Managing Reliability', '2024-09-03'],
  ['Managing and Securing the Apigee Hybrid API Platform', '2024-09-03'],
  ['Organize and Govern Data with Knowledge Catalog', '2024-08-28'],
  ['Monitor Environments with Google Cloud Managed Service for Prometheus', '2024-08-28'],
  ['Managing Cloud Infrastructure with Terraform', '2024-08-28'],
  ['Derive Insights from BigQuery Data', '2024-08-23'],
  ['Use Machine Learning APIs on Google Cloud', '2024-08-23'],
  ['Language, Speech, Text, & Translation with Google Cloud APIs', '2024-08-22'],
  ['Store, Process, and Manage Data on Google Cloud - Command Line', '2024-08-22'],
  ['Migrate MySQL Data to Cloud SQL Using Database Migration Service', '2024-08-22'],
  ['Mitigate Threats and Vulnerabilities with Security Command Center', '2024-08-21'],
  ['Manage Kubernetes in Google Cloud', '2024-08-15'],
  ['Responsible AI: Applying AI Principles with Google Cloud', '2024-08-15'],
  ['Prompt Design in Agent Platform', '2024-08-15'],
  ['Introduction to Responsible AI', '2024-08-14'],
  ['Introduction to Large Language Models', '2024-08-14'],
  ['Introduction to Generative AI', '2024-08-14'],
  ['Automate Deployment and Manage Traffic on a Google Cloud Network', '2024-07-25'],
  ['Configure Service Accounts and IAM Roles for Google Cloud', '2024-07-24'],
];

const CATS = [
  ['ai', /\bAI\b|\bML\b|Machine Learning|Language|Prompt|Generative/],
  ['security', /Secur|Threat|IAM|Service Accounts/],
  ['data', /Data|BigQuery|SQL|Catalog|Blockchain/],
  ['infra', /./],
];

export const GCSB = {
  url: 'https://www.skills.google/public_profiles/40b8a3bc-8e3b-4d11-8020-2f11f8d4ff49',
  name: 'Tamilvanan Gowran',
  league: 'Bronze',
  points: 51260,
  memberSince: 2023,
  // [key, label, colour, icon]
  categories: [
    ['infra', 'infra & k8s', '#2563eb', 'helm'],
    ['ai', 'ai / ml', '#22d3ee', 'sparkles'],
    ['security', 'security', '#818cf8', 'shield'],
    ['data', 'data', '#60a5fa', 'database'],
  ],
  badges: B.map(([title, date]) => ({
    title,
    date,
    cat: CATS.find(([, re]) => re.test(title))[0],
  })),
};

export const SMN = {
  logo: 'https://selfmade.ninja/assets/images/ninja-logo.png',
  // TODO: replace with your SelfMade Ninja Labs profile URL
  url: 'https://labs.selfmade.ninja/',
  title: 'Cyber Crusader II',
  next: 'Cyber Crusader III',
  team: 'Rootinators',
  globalRank: 54,
  stats: [
    { label: 'zeal acquired', value: 8965, icon: 'flame' },
    { label: 'jolt acquired', value: 3070, icon: 'bolt' },
    { label: 'quizzes completed', value: 132, icon: 'dumbbell' },
    { label: 'quiz achievements', value: 48, icon: 'trophy' },
  ],
  skills: [
    { name: 'linux', count: 38 },
    { name: 'devops', count: 34 },
    { name: 'internet-protocols', count: 31 },
  ],
};
