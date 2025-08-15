export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'tools' | 'soft' | 'security' | 'ai' | 'automation'
  years: number
  projects: number
}

export interface SkillCategory {
  name: string
  skills: Skill[]
  color: string
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 92, category: 'frontend', years: 4, projects: 20 },
  { name: 'TypeScript', level: 88, category: 'frontend', years: 3, projects: 25 },
  { name: 'Next.js', level: 90, category: 'frontend', years: 3, projects: 18 },
  { name: 'JavaScript', level: 95, category: 'frontend', years: 5, projects: 35 },
  { name: 'Tailwind CSS', level: 94, category: 'frontend', years: 3, projects: 22 },
  { name: 'shadcn/ui', level: 85, category: 'frontend', years: 2, projects: 12 },
  
  // Backend
  { name: 'Node.js', level: 88, category: 'backend', years: 4, projects: 24 },
  { name: 'Python', level: 92, category: 'backend', years: 5, projects: 28 },
  { name: 'C++', level: 78, category: 'backend', years: 3, projects: 8 },
  { name: 'REST APIs', level: 94, category: 'backend', years: 4, projects: 30 },
  { name: 'Serverless', level: 82, category: 'backend', years: 2, projects: 15 },
  
  // DevOps & Cloud
  { name: 'AWS', level: 80, category: 'devops', years: 2, projects: 12 },
  { name: 'Azure', level: 75, category: 'devops', years: 2, projects: 8 },
  { name: 'Docker', level: 85, category: 'devops', years: 3, projects: 18 },
  { name: 'GitHub Actions', level: 82, category: 'devops', years: 2, projects: 15 },
  { name: 'Linux', level: 88, category: 'devops', years: 4, projects: 20 },
  { name: 'Raspberry Pi', level: 90, category: 'devops', years: 3, projects: 10 },
  
  // Database & Data
  { name: 'Supabase', level: 85, category: 'database', years: 2, projects: 12 },
  { name: 'PostgreSQL', level: 80, category: 'database', years: 3, projects: 15 },
  { name: 'Data Analysis', level: 88, category: 'database', years: 4, projects: 20 },
  { name: 'Data Visualization', level: 85, category: 'database', years: 3, projects: 14 },
  
  // Tools & Automation
  { name: 'n8n', level: 78, category: 'tools', years: 1, projects: 6 },
  { name: 'Git', level: 95, category: 'tools', years: 5, projects: 50 },
  { name: 'VS Code', level: 94, category: 'tools', years: 5, projects: 50 },
  { name: 'Obsidian', level: 92, category: 'tools', years: 2, projects: 8 },
  { name: 'Vercel', level: 90, category: 'tools', years: 3, projects: 20 },
  
  // Security & AI
  { name: 'Cybersecurity', level: 75, category: 'security', years: 2, projects: 8 },
  { name: 'AI/LLM Integration', level: 82, category: 'ai', years: 2, projects: 10 },
  { name: 'Automation', level: 90, category: 'automation', years: 4, projects: 25 },
  
  // Soft Skills
  { name: 'Problem Solving', level: 96, category: 'soft', years: 5, projects: 50 },
  { name: 'System Thinking', level: 92, category: 'soft', years: 4, projects: 30 },
  { name: 'Collaboration', level: 90, category: 'soft', years: 5, projects: 40 },
  { name: 'Continuous Learning', level: 95, category: 'soft', years: 5, projects: 50 }
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: skills.filter(skill => skill.category === 'frontend'),
    color: '#00ff41'
  },
  {
    name: 'Backend',
    skills: skills.filter(skill => skill.category === 'backend'),
    color: '#00d4ff'
  },
  {
    name: 'DevOps & Cloud',
    skills: skills.filter(skill => skill.category === 'devops'),
    color: '#bf00ff'
  },
  {
    name: 'Database & Data',
    skills: skills.filter(skill => skill.category === 'database'),
    color: '#ff0080'
  },
  {
    name: 'Tools & Platforms',
    skills: skills.filter(skill => skill.category === 'tools'),
    color: '#ffff00'
  },
  {
    name: 'Security & AI',
    skills: skills.filter(skill => skill.category === 'security' || skill.category === 'ai'),
    color: '#ff4500'
  },
  {
    name: 'Automation',
    skills: skills.filter(skill => skill.category === 'automation'),
    color: '#00ffff'
  },
  {
    name: 'Core Skills',
    skills: skills.filter(skill => skill.category === 'soft'),
    color: '#ff8000'
  }
]

export const topSkills = skills
  .sort((a, b) => b.level - a.level)
  .slice(0, 10)

export const saakeEngine = {
  hackermanQuotient: 89,
  identity: {
    legal_name: "Saake",
    aliases: ["Saake", "Ari"],
    tagline: "We got this.",
    short_bio: "Full-stack developer and automation enthusiast building secure, scalable web apps, AI demos, and data workflows.",
    professional_philosophy: "Collaborative problem solving through automation, security best practices, and continuous learning."
  },
  attributes: {
    analytical: 95,
    curious: 92,
    persistent: 94,
    adaptable: 88,
    solutionOriented: 96,
    collaborative: 90
  },
  personality: {
    type: 'Automation-Security Architect',
    traits: ['Analytical', 'Curious', 'Persistent', 'Adaptable', 'Solution-oriented', 'Collaborative'],
    motto: 'We got this.'
  },
  goals: {
    short_term: [
      "Build AI/LLM integrations and demos",
      "Implement n8n automation workflows", 
      "Develop self-hosted Raspberry Pi projects on Linux",
      "Launch secure cloud infrastructure on AWS/Azure",
      "Contribute to open-source cybersecurity tools",
      "Master modern web development with Next.js and React"
    ],
    long_term: [
      "Lead architecture for enterprise AI and automation platforms",
      "Create a self-sustaining home lab for learning and hosting",
      "Publish open-source cybersecurity frameworks",
      "Scale a travel automation site (eostrails.com) to 50k monthly users",
      "Advise startups on secure, automated cloud deployments",
      "Achieve recognized expertise in AI, automation, and security"
    ]
  },
  interests: [
    "AI & large language models",
    "Cybersecurity & ethical hacking", 
    "Self-hosting & home labs",
    "Automation & no-code tools",
    "Game development & 3D graphics",
    "Travel & photography",
    "Piano & music theory",
    "Ergonomic tech setups"
  ]
}