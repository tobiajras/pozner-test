export const company = {
  id: 'seattle-cafe',
  name: 'Seattle Café',
  adress: 'Charcas 4625',
  city: 'Palermo',
  telephone: '1164066534',
  email: null,
  instagram: 'seattle.ba',
  facebook: 'seattle.baires',
  whatsapp: '1164066534',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5771.7655685970985!2d-58.42585673083121!3d-34.580588094153406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb55ad82beaad%3A0xab091ac40ce06e0a!2sSeattle%20Caf%C3%A9!5e0!3m2!1ses-419!2sus!4v1725682186535!5m2!1ses-419!2sus',
  menu: null,
  openDays: [
    { day: 'Lunes', hours: ['08:00 a 19:00'] },
    { day: 'Martes', hours: ['08:00 a 19:00'] },
    { day: 'Miércoles', hours: ['08:00 a 19:00'] },
    { day: 'Jueves', hours: ['08:00 a 19:00'] },
    { day: 'Viernes', hours: ['08:00 a 19:00'] },
    { day: 'Sábado', hours: ['08:00 a 19:00'] },
    // { day: 'Domingo', hours: ['09:00 a 20:00'] },
  ],
  footer: 'Café de Especialidad, dedicación y pasión por lo que hacemos.',
};

export const nosotros = {
  text: 'En Seattle Café, nos enorgullecemos de nuestra larga trayectoria con los más altos estándares de calidad. Con amplia experiencia en el rubro, nos hemos comprometido a brindar un ambiente ideal para que disfrutes de nuestra gastronomía con amigos y familiares.',
};

export const metadataCompany = {
  metadataBase: 'https://seattle-cafe.vercel.app/',
  title: 'Seattle Café - Café de Especialidad',
  description: 'Café de Especialidad, dedicación y pasión por lo que hacemos.',
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
