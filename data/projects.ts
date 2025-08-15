export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  stats: {
    stars?: number
    forks?: number
    downloads?: number
    users?: number
    visits?: number
  }
  techStack: string[]
  timeline: string
  status: 'completed' | 'in-progress' | 'archived'
}

export const projects: Project[] = [
  {
    id: 'eostrails',
    title: 'EOS Trails',
    description: 'Interactive travel site with custom itinerary automation and AI recommendations',
    longDescription: 'A comprehensive travel platform that combines interactive mapping, automated itinerary generation, and AI-powered recommendations. Built with Next.js and integrated with multiple travel APIs to provide personalized travel experiences.',
    image: '/projects/eostrails.jpg',
    tags: ['Travel', 'AI', 'Automation'],
    demoUrl: 'https://eostrails.com',
    githubUrl: 'https://github.com/saake/eostrails',
    featured: true,
    stats: {
      users: 15000,
      visits: 45000
    },
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'AI APIs', 'Tailwind CSS'],
    timeline: '2024',
    status: 'in-progress'
  },
  {
    id: 'saake-tools',
    title: 'Saake Tools',
    description: 'Collection of utilities: JSON formatter, JWT decoder, WebSocket echo tester',
    longDescription: 'A comprehensive suite of developer tools including JSON formatter with validation, JWT token decoder with security analysis, WebSocket echo tester, and various other utilities for daily development tasks.',
    image: '/projects/saake-tools.jpg',
    tags: ['Developer Tools', 'Utilities', 'Web Tools'],
    demoUrl: 'https://tools.saake.dev',
    githubUrl: 'https://github.com/saake/saake-tools',
    featured: true,
    stats: {
      stars: 156,
      forks: 23,
      users: 2800
    },
    techStack: ['React', 'TypeScript', 'Monaco Editor', 'Tailwind CSS'],
    timeline: '2024',
    status: 'completed'
  },
  {
    id: 'ai-chatbot-demo',
    title: 'AI Chatbot Demo',
    description: 'Serverless GPT/Gemini integration for customer interaction automation',
    longDescription: 'A serverless chatbot implementation showcasing integration with multiple AI providers including OpenAI GPT and Google Gemini. Features context management, conversation history, and customizable personality settings.',
    image: '/projects/ai-chatbot.jpg',
    tags: ['AI', 'Chatbot', 'Serverless'],
    demoUrl: 'https://chatbot-demo.saake.dev',
    githubUrl: 'https://github.com/saake/ai-chatbot-demo',
    featured: true,
    stats: {
      stars: 89,
      forks: 12,
      users: 450
    },
    techStack: ['Next.js', 'OpenAI API', 'Gemini API', 'Vercel', 'Supabase'],
    timeline: '2024',
    status: 'completed'
  },
  {
    id: 'home-lab-automation',
    title: 'Home Lab Automation',
    description: 'Raspberry Pi self-hosted services with Ansible and Docker',
    longDescription: 'A complete home lab setup featuring multiple Raspberry Pi devices running containerized services. Includes automated deployment with Ansible, monitoring with Grafana, and various self-hosted applications.',
    image: '/projects/home-lab.jpg',
    tags: ['Home Lab', 'Raspberry Pi', 'Docker'],
    githubUrl: 'https://github.com/saake/home-lab-automation',
    featured: false,
    stats: {
      stars: 234,
      forks: 45
    },
    techStack: ['Raspberry Pi', 'Docker', 'Ansible', 'Linux', 'Grafana'],
    timeline: '2023-2024',
    status: 'in-progress'
  },
  {
    id: 'portfolio-dashboard',
    title: 'Portfolio Dashboard',
    description: 'Real-time data command center showing GitHub activity, CI/CD status, and network pings',
    longDescription: 'A comprehensive dashboard that aggregates data from multiple sources including GitHub API, CI/CD pipelines, server monitoring, and network status. Features real-time updates and customizable widgets.',
    image: '/projects/dashboard.jpg',
    tags: ['Dashboard', 'Real-time', 'Monitoring'],
    demoUrl: 'https://dashboard.saake.dev',
    githubUrl: 'https://github.com/saake/portfolio-dashboard',
    featured: false,
    stats: {
      stars: 67,
      forks: 8
    },
    techStack: ['React', 'Node.js', 'WebSockets', 'GitHub API', 'Docker'],
    timeline: '2024',
    status: 'completed'
  },
  {
    id: 'n8n-workflows',
    title: 'n8n Automation Workflows',
    description: 'Collection of automation workflows for productivity and data processing',
    longDescription: 'A curated collection of n8n workflows for various automation tasks including social media management, data synchronization, email processing, and integration between different services.',
    image: '/projects/n8n-workflows.jpg',
    tags: ['Automation', 'n8n', 'Workflows'],
    githubUrl: 'https://github.com/saake/n8n-workflows',
    featured: false,
    stats: {
      stars: 123,
      forks: 34
    },
    techStack: ['n8n', 'JavaScript', 'APIs', 'Webhooks'],
    timeline: '2024',
    status: 'in-progress'
  }
]

export const featuredProjects = projects.filter(project => project.featured)
export const allProjects = projects