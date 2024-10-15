export const company = {
  id: 'estoico-coffee',
  name: 'Estoico Café',
  adress: 'Acoyte 899',
  city: 'Caballito',
  telephone: null,
  email: null,
  instagram: 'estoicocafe',
  facebook: null,
  whatsapp: null,
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13135.414957834642!2d-58.450284634198!3d-34.60785980623461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccba5e0e19adb%3A0xc2dc96a25b4c78c4!2sEstoico%20Caf%C3%A9%20De%20Especialidad!5e0!3m2!1ses-419!2sar!4v1728699081128!5m2!1ses-419!2sar',
  menu: 'https://menu.fu.do/estoico?fbclid=PAZXh0bgNhZW0CMTEAAaZy3PPAHPt1VxQo8Yc34vlw1yFGJAII_03OFiNmHdLRHZWbaElZd9yBuuM_aem_iNJd-LD8MxePe0tRih0jWQ',
  openDays: [
    { day: 'Lunes', hours: ['09:00 a 20:00'] },
    // { day: 'Martes', hours: ['09:00 a 20:00'] },
    { day: 'Miércoles', hours: ['08:30 a 20:00'] },
    { day: 'Jueves', hours: ['09:00 a 20:00'] },
    { day: 'Viernes', hours: ['08:30 a 20:00'] },
    { day: 'Sábado', hours: ['09:00 a 20:00'] },
    { day: 'Domingo', hours: ['09:00 a 20:00'] },
  ],
  footer: 'Café de Especialidad, dedicación y pasión por lo que hacemos.',
};

export const nosotros = {
  text: 'En Estoico Café, nos enorgullecemos de nuestra larga trayectoria con los más altos estándares de calidad. Con amplia experiencia en el rubro, nos hemos comprometido a brindar un ambiente ideal para que disfrutes de nuestra gastronomía con amigos y familiares.',
};

export const metadataCompany = {
  metadataBase: 'https://estoico-cafe.vercel.app/',
  title: 'Estoico Café - Café de Especialidad',
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
