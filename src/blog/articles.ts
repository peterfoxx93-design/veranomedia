export const articles = [
  {
    id: 'landing-vs-sitio',
    title: 'Landing page vs sitio web: la decisión que muchos negocios toman mal',
    category: 'Diseño Web',
    slug: 'landing-vs-sitio',
    readTime: 7,
    excerpt: 'No es lo mismo un local en un mall que una boutique en una calle tranquila. Tu sitio web tampoco debería serlo.',
    date: 'Mayo 2026',
    published: true,
  },
  {
    id: 'chatbots-whatsapp',
    title: 'Chatbots en WhatsApp: cómo funcionan y cuánto puedes ahorrar',
    category: 'Automatización',
    slug: 'chatbots-whatsapp',
    readTime: 6,
    excerpt: 'Tu cliente pregunta a las 11 de la noche. Un chatbot responde. Tú te despiertas con un lead calificado.',
    date: 'Junio 2026',
    published: true,
  },
  {
    id: 'tu-negocio-no-aparece-en-google-maps',
    title: 'Tu negocio no aparece en Google Maps? Esto es lo que estás haciendo mal',
    category: 'SEO Local',
    slug: 'tu-negocio-no-aparece-en-google-maps',
    readTime: 7,
    excerpt: 'Si tu negocio no aparece cuando alguien busca "dentista cerca de mí", no es culpa de Google. Es culpa tuya.',
    date: 'Junio 2026',
    published: true,
  },
]

export type Article = typeof articles[0]
