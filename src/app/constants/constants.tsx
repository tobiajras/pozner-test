export const company = {
  id: 'central-cafe',
  name: 'Central Café',
  adress: 'Santo Tomé 5121',
  city: 'Villa Devoto',
  telephone: '1168854898',
  email: 'central.especialidad@gmail.com',
  instagram: 'central_____cafe',
  facebook: null,
  whatsapp: '1168854898',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210075.50293967302!2d-58.591971071874966!3d-34.64384870518352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9e1cbc591ff%3A0xb54a562ff963c310!2sCentral%20caf%C3%A9%20de%20especialidad!5e0!3m2!1ses-419!2sar!4v1730860348482!5m2!1ses-419!2sar',
  menu: 'https://borders.bistrosoft.com/menu?commerceId=11111683&originName=Mostrador',
  openDays: [
    { day: 'Lunes', hours: ['14:00 a 20:00'] },
    { day: 'Martes', hours: ['08:00 a 20:00'] },
    { day: 'Miércoles', hours: ['08:00 a 20:00'] },
    { day: 'Jueves', hours: ['08:00 a 20:00'] },
    { day: 'Viernes', hours: ['08:00 a 20:00'] },
    { day: 'Sábado', hours: ['10:00 a 20:00'] },
    { day: 'Domingo', hours: ['09:00 a 14:00'] },
  ],
  footer: 'Café de especialidad, un espacio para compartir momentos únicos.',
};

export const nosotros = {
  text: 'En Central Café, nuestra experiencia y dedicación nos motivan a brindarte un ambiente único y acogedor. Vení a disfrutar de nuestros sabores en buena compañía.',
};

export const metadataCompany = {
  metadataBase: 'https://central-cafe.vercel.app/',
  title: 'Central Café - Café de Especialidad',
  description:
    'Café de especialidad, un espacio para compartir momentos únicos.',
};

export const navigation = [
  {
    id: '0',
    title: 'Inicio',
    url: '/',
  },
  {
    id: '1',
    title: 'Productos',
    url: '/productos',
  },
  {
    id: '2',
    title: 'Nosotros',
    url: '/nosotros',
  },
  {
    id: '3',
    title: 'Contacto',
    url: '/contacto',
  },
];
