export const company = {
  id: 'duca-caffe',
  name: 'Duca Caffé',
  adress: 'Thames 1759',
  city: 'Palermo',
  telephone: null,
  email: null,
  instagram: 'ducacaffe',
  facebook: 'duca.cafeyapericena',
  whatsapp: null,
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.674019313483!2d-58.42957917017147!3d-34.58711399946306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb51be0fd3be7%3A0x4cf6e3a1aa50d5e1!2sDUCA%20-%20Caff%C3%A8%20%26%20Apericena!5e0!3m2!1sen!2sar!4v1724983553123!5m2!1sen!2sar',
  menu: 'https://queresto.com/ducacaffe?fbclid=PAZXh0bgNhZW0CMTEAAaZDySIq3YnXQ0mrquckto7Hzf7k4mAFTB49D7l5YCTJYpR3fBJuVn3172c_aem_orJq9NZTP7_t44GX-GLB_A',
  openDays: [
    { day: 'Lunes', hours: ['07:30 a 19:30'] },
    // { day: 'Martes', hours: ['09:00 a 19:30'] },
    { day: 'Miércoles', hours: ['07:30 a 19:30'] },
    { day: 'Jueves', hours: ['07:30 a 19:30'] },
    { day: 'Viernes', hours: ['07:30 a 21:30'] },
    { day: 'Sábado', hours: ['07:30 a 19:30'] },
    { day: 'Domingo', hours: ['07:30 a 19:30'] },
  ],
  footer: 'Café de Especialidad, dedicación y pasión por lo que hacemos.',
};

export const nosotros = {
  text: 'En Duca Caffé, nos enorgullecemos de nuestra larga trayectoria con los más altos estándares de calidad. Con amplia experiencia en el rubro, nos hemos comprometido a brindar un ambiente ideal para que disfrutes de nuestra gastronomía con amigos y familiares.',
};

export const metadataCompany = {
  metadataBase: 'https://duca-caffe.vercel.app/',
  title: 'Duca Caffé - Café de Especialidad',
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
