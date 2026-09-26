export const site = {
  name: 'CursivePilot',
  shortName: 'CursivePilot',
  tagline: 'Cursive, handwriting and calligraphy tools that work in your browser.',
  description: 'Free browser-based tools for cursive text, handwriting images, calligraphy, signatures and printable handwriting worksheets.',
  language: 'en',
  themeColor: '#16382f',
  email: process.env.CONTACT_EMAIL || '',
};

export const nav = [
  { href: '/cursive-generator/', label: 'Cursive' },
  { href: '/handwriting-generator/', label: 'Handwriting' },
  { href: '/calligraphy-generator/', label: 'Calligraphy' },
  { href: '/signature-generator/', label: 'Signature' },
  { href: '/handwriting-worksheet-generator/', label: 'Worksheets' },
  { href: '/cursive-alphabet/', label: 'Alphabet' },
];

export const toolCards = [
  {
    href: '/cursive-generator/',
    title: 'Cursive Generator',
    description: 'Turn plain text into copy-and-paste cursive Unicode styles instantly.',
    badge: 'Copyable text',
  },
  {
    href: '/handwriting-generator/',
    title: 'Handwriting Generator',
    description: 'Render typed text as a handwriting-style page and export a PNG or print-ready PDF.',
    badge: 'PNG + print',
  },
  {
    href: '/calligraphy-generator/',
    title: 'Calligraphy Generator',
    description: 'Create calligraphy-style lettering with transparent or paper backgrounds.',
    badge: 'Design export',
  },
  {
    href: '/signature-generator/',
    title: 'Cursive Name & Signature Generator',
    description: 'Preview a name across handwriting and script styles, then export a transparent PNG.',
    badge: 'Name styles',
  },
  {
    href: '/handwriting-worksheet-generator/',
    title: 'Handwriting Worksheet Generator',
    description: 'Build printable trace, copy and write practice sheets from your own words.',
    badge: 'Printable',
  },
];
