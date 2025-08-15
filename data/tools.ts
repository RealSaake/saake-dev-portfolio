export interface Tool {
  id: string
  title: string
  description: string
  category: 'formatter' | 'converter' | 'generator' | 'analyzer' | 'utility'
  icon: string
  color: string
  features: string[]
  technologies: string[]
  status: 'active' | 'beta' | 'coming-soon'
  url?: string
}

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Format, validate, and minify JSON with syntax highlighting and error detection.',
    category: 'formatter',
    icon: '{}',
    color: 'neon-green',
    features: [
      'Real-time validation',
      'Syntax highlighting',
      'Minify/Beautify',
      'Error detection',
      'Copy to clipboard'
    ],
    technologies: ['React', 'Monaco Editor', 'JSON Schema'],
    status: 'active',
    url: '/tools/json-formatter'
  },
  {
    id: 'base64-encoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings with support for files and images.',
    category: 'converter',
    icon: '⚡',
    color: 'neon-blue',
    features: [
      'Text encoding/decoding',
      'File upload support',
      'Image preview',
      'Batch processing',
      'Download results'
    ],
    technologies: ['React', 'File API', 'Canvas API'],
    status: 'active',
    url: '/tools/base64'
  },
  {
    id: 'color-palette',
    title: 'Color Palette Generator',
    description: 'Generate beautiful color palettes with accessibility checks and export options.',
    category: 'generator',
    icon: '🎨',
    color: 'neon-purple',
    features: [
      'AI-powered generation',
      'Accessibility checks',
      'Multiple formats',
      'Gradient support',
      'Export to CSS/JSON'
    ],
    technologies: ['React', 'Color Theory', 'WCAG Guidelines'],
    status: 'active',
    url: '/tools/color-palette'
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester & Builder',
    description: 'Test regular expressions with real-time matching and explanation.',
    category: 'analyzer',
    icon: '.*',
    color: 'neon-pink',
    features: [
      'Real-time testing',
      'Match highlighting',
      'Regex explanation',
      'Common patterns',
      'Performance metrics'
    ],
    technologies: ['React', 'RegExp API', 'Syntax Highlighting'],
    status: 'active',
    url: '/tools/regex-tester'
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and other hash values for text and files.',
    category: 'utility',
    icon: '#',
    color: 'yellow-400',
    features: [
      'Multiple algorithms',
      'File hashing',
      'Batch processing',
      'Compare hashes',
      'Secure generation'
    ],
    technologies: ['React', 'Web Crypto API', 'File API'],
    status: 'active',
    url: '/tools/hash-generator'
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Create customizable QR codes with logos, colors, and various data types.',
    category: 'generator',
    icon: '⬜',
    color: 'neon-green',
    features: [
      'Custom styling',
      'Logo embedding',
      'Multiple formats',
      'Batch generation',
      'High resolution'
    ],
    technologies: ['React', 'QR.js', 'Canvas API'],
    status: 'beta',
    url: '/tools/qr-generator'
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Token Decoder',
    description: 'Decode and analyze JSON Web Tokens with security validation.',
    category: 'analyzer',
    icon: '🔐',
    color: 'neon-blue',
    features: [
      'Token decoding',
      'Signature verification',
      'Expiry checking',
      'Claims analysis',
      'Security warnings'
    ],
    technologies: ['React', 'JWT Library', 'Crypto'],
    status: 'active',
    url: '/tools/jwt-decoder'
  },
  {
    id: 'api-tester',
    title: 'API Request Tester',
    description: 'Test REST APIs with custom headers, authentication, and response analysis.',
    category: 'utility',
    icon: '🌐',
    color: 'neon-purple',
    features: [
      'Multiple HTTP methods',
      'Custom headers',
      'Authentication support',
      'Response formatting',
      'History tracking'
    ],
    technologies: ['React', 'Fetch API', 'Monaco Editor'],
    status: 'beta',
    url: '/tools/api-tester'
  },
  {
    id: 'markdown-editor',
    title: 'Markdown Editor & Preview',
    description: 'Write and preview Markdown with live rendering and export options.',
    category: 'formatter',
    icon: '📝',
    color: 'neon-pink',
    features: [
      'Live preview',
      'Syntax highlighting',
      'Export to HTML/PDF',
      'Table support',
      'Math equations'
    ],
    technologies: ['React', 'Marked.js', 'KaTeX'],
    status: 'coming-soon'
  }
]

export const toolCategories = [
  { id: 'formatter', name: 'Formatters', color: 'neon-green' },
  { id: 'converter', name: 'Converters', color: 'neon-blue' },
  { id: 'generator', name: 'Generators', color: 'neon-purple' },
  { id: 'analyzer', name: 'Analyzers', color: 'neon-pink' },
  { id: 'utility', name: 'Utilities', color: 'yellow-400' }
]

export const activeTools = tools.filter(tool => tool.status === 'active')
export const betaTools = tools.filter(tool => tool.status === 'beta')
export const comingSoonTools = tools.filter(tool => tool.status === 'coming-soon')