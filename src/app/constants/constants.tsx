export const company = {
  id: 'carbonetti-cafe',
  name: 'Carbonetti Café',
  adress: 'Av. Coronel Diaz 1423',
  city: 'Palermo',
  telephone: null,
  email: 'cafeteriacarbonetti@gmail.com',
  instagram: 'cafeteriacarbonetti',
  facebook: null,
  whatsapp: null,
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.407944654201!2d-58.41400507717593!3d-34.5938445224212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb33b176d48f%3A0x259a195d5a181507!2sCafeter%C3%ADa%20Carbonetti!5e0!3m2!1ses-419!2sar!4v1731378457079!5m2!1ses-419!2sar',
  menu: 'https://menu.fu.do/cafeter%C3%ADacarbonetti/qr-menu',
  openDays: [
    // { day: 'Lunes', hours: ['08:30 a 20:00'] },
    { day: 'Martes', hours: ['08:30 a 20:00'] },
    { day: 'Miércoles', hours: ['08:30 a 20:00'] },
    { day: 'Jueves', hours: ['08:30 a 20:00'] },
    { day: 'Viernes', hours: ['08:30 a 20:00'] },
    { day: 'Sábado', hours: ['08:30 a 20:00'] },
    { day: 'Domingo', hours: ['09:00 a 19:30'] },
  ],
  footer: 'Café de especialidad, un espacio para compartir momentos únicos.',
};

export const nosotros = {
  text: 'En Carbonetti Café, nuestra experiencia y dedicación nos motivan a brindarte un ambiente único y acogedor. Vení a disfrutar de nuestros sabores en buena compañía.',
};

export const metadataCompany = {
  metadataBase: 'https://carbonetti-cafe.vercel.app/',
  title: 'Carbonetti Café - Café de Especialidad',
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
