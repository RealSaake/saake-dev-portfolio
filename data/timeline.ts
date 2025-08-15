export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'work' | 'education' | 'project' | 'achievement' | 'certification'
  company?: string
  location?: string
  technologies?: string[]
  link?: string
  featured: boolean
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'eostrails-launch',
    date: '2024-08',
    title: 'Launched EOS Trails Travel Platform',
    description: 'Built and launched interactive travel site with AI-powered itinerary automation. Growing towards 50k monthly users with advanced travel planning features.',
    type: 'project',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'AI APIs'],
    link: 'https://eostrails.com',
    featured: true
  },
  {
    id: 'ai-automation-focus',
    date: '2024-06',
    title: 'AI & Automation Specialization',
    description: 'Pivoted focus to AI/LLM integrations and automation workflows. Building demos and production systems with GPT, Gemini, and n8n automation.',
    type: 'achievement',
    technologies: ['OpenAI API', 'Gemini API', 'n8n', 'Python'],
    featured: true
  },
  {
    id: 'home-lab-setup',
    date: '2024-03',
    title: 'Home Lab Infrastructure',
    description: 'Built comprehensive self-hosted home lab with multiple Raspberry Pi devices. Implementing Docker containers, monitoring, and automation with Ansible.',
    type: 'project',
    technologies: ['Raspberry Pi', 'Docker', 'Ansible', 'Linux', 'Grafana'],
    featured: true
  },
  {
    id: 'saake-tools-release',
    date: '2024-01',
    title: 'Released Saake Developer Tools',
    description: 'Launched collection of web-based developer utilities including JSON formatter, JWT decoder, and WebSocket tester. Gained 2800+ active users.',
    type: 'project',
    technologies: ['React', 'TypeScript', 'Monaco Editor'],
    link: 'https://tools.saake.dev',
    featured: true
  },
  {
    id: 'cybersecurity-learning',
    date: '2023-10',
    title: 'Cybersecurity & Ethical Hacking',
    description: 'Started intensive learning in cybersecurity best practices and ethical hacking. Contributing to open-source security tools and frameworks.',
    type: 'education',
    technologies: ['Security Tools', 'Penetration Testing', 'Linux'],
    featured: false
  },
  {
    id: 'cloud-certification',
    date: '2023-08',
    title: 'AWS & Azure Cloud Certifications',
    description: 'Achieved cloud architecture certifications for both AWS and Azure platforms. Implementing secure, scalable cloud infrastructure for projects.',
    type: 'certification',
    featured: true
  },
  {
    id: 'fullstack-developer',
    date: '2023-01',
    title: 'Senior Full-Stack Developer',
    description: 'Advanced to senior role focusing on modern web development with React, Next.js, and serverless architectures. Leading automation initiatives.',
    type: 'work',
    company: 'Tech Innovation Co.',
    location: 'Remote',
    technologies: ['React', 'Next.js', 'TypeScript', 'AWS', 'Automation'],
    featured: true
  },
  {
    id: 'automation-discovery',
    date: '2022-09',
    title: 'Discovered n8n & Automation',
    description: 'Started exploring workflow automation with n8n and no-code tools. Built first automation workflows for productivity and data processing.',
    type: 'achievement',
    technologies: ['n8n', 'Automation', 'APIs', 'Webhooks'],
    featured: false
  },
  {
    id: 'raspberry-pi-projects',
    date: '2022-06',
    title: 'First Raspberry Pi Projects',
    description: 'Started hardware projects with Raspberry Pi. Built home monitoring system and learned Linux system administration.',
    type: 'project',
    technologies: ['Raspberry Pi', 'Python', 'Linux', 'IoT'],
    featured: false
  },
  {
    id: 'web-dev-start',
    date: '2021-03',
    title: 'Started Web Development Journey',
    description: 'Began intensive learning of modern web development. Mastered JavaScript, React, and full-stack development fundamentals.',
    type: 'education',
    technologies: ['JavaScript', 'React', 'Node.js', 'Python'],
    featured: true
  }
]

export const featuredEvents = timelineEvents.filter(event => event.featured)
export const allEvents = timelineEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())