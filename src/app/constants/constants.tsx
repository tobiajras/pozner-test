export const company = {
  id: 'habito-cafe',
  name: 'Hábito Café',
  adress: 'México 1152',
  city: 'CABA',
  telephone: '1164907828',
  email: 'habitocafeteria@gmail.com',
  instagram: 'habito.cafe',
  facebook: 'habito.tomabuencafe',
  whatsapp: '1164907828',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.555880620415!2d-58.382409100000004!3d-34.6153903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad79cce3563%3A0xf34b22bd7f2a7491!2zSMOhYml0byBDYWbDqQ!5e0!3m2!1ses-419!2sar!4v1728410328680!5m2!1ses-419!2sar',
  menu: null,
  openDays: [
    { day: 'Lunes', hours: ['09:00 a 19:00'] },
    { day: 'Martes', hours: ['09:00 a 19:00'] },
    { day: 'Miércoles', hours: ['09:00 a 19:00'] },
    { day: 'Jueves', hours: ['09:00 a 19:00'] },
    { day: 'Viernes', hours: ['09:00 a 19:00'] },
    { day: 'Sábado', hours: ['10:00 a 18:00'] },
    // { day: 'Domingo', hours: ['10:00 a 18:00'] },
  ],
  footer: 'Café de Especialidad, dedicación y pasión por lo que hacemos.',
};

export const nosotros = {
  text: 'En Hábito Café, nos enorgullecemos de nuestra larga trayectoria con los más altos estándares de calidad. Con amplia experiencia en el rubro, nos hemos comprometido a brindar un ambiente ideal para que disfrutes de nuestra gastronomía con amigos y familiares.',
};

export const metadataCompany = {
  metadataBase: 'https://habito-cafe.vercel.app/',
  title: 'Hábito Café - Café de Especialidad',
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
