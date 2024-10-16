export const company = {
  id: 'chois-cafe',
  name: 'Choi’s Café',
  adress: null,
  city: null,
  telephone: null,
  email: null,
  instagram: 'choiscafe_',
  facebook: null,
  whatsapp: null,
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13132.039548257635!2d-58.481960005531036!3d-34.629190436028594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc96c42e2e521%3A0xe54f73e2a3724079!2sChoi&#39;s%20%26%20Cafe!5e0!3m2!1ses-419!2sar!4v1728793792504!5m2!1ses-419!2sar',
  menu: 'https://pedix.app/choiscafe/categoria/IvAWVDzKtInNIIrt5MPN',
  openDays: [
    { day: 'Lunes', hours: ['07:00 a 20:00'] },
    { day: 'Martes', hours: ['07:00 a 20:00'] },
    { day: 'Miércoles', hours: ['07:00 a 20:00'] },
    { day: 'Jueves', hours: ['07:00 a 20:00'] },
    { day: 'Viernes', hours: ['07:00 a 20:00'] },
    { day: 'Sábado', hours: ['07:00 a 20:00'] },
    { day: 'Domingo', hours: ['08:00 a 16:00'] },
  ],
  footer: 'Café de Especialidad, dedicación y pasión por lo que hacemos.',
};

export const nosotros = {
  text: 'En Choi’s Café, nos enorgullecemos de nuestra larga trayectoria con los más altos estándares de calidad. Con amplia experiencia en el rubro, nos hemos comprometido a brindar un ambiente ideal para que disfrutes de nuestra gastronomía con amigos y familiares.',
};

export const metadataCompany = {
  metadataBase: 'https://chois-cafe.vercel.app/',
  title: 'Choi’s Café - Café de Especialidad',
  description: 'Café de Especialidad, dedicación y pasión por lo que hacemos.',
};

export const sedes = [
  {
    id: 1,
    title: 'Avellaneda',
    adress: 'Av. Avellaneda 3780',
    city: 'Flores',
    tel: '1166136307',
    whatsapp: '1166136307',
    schedule:
      'Horario: Lunes a Viernes 07:00 a 20:00hs | Sábados y Domingos 08:00 a 20:00hs',
    appointment: 'https://maps.app.goo.gl/rQDHMRJeVE47QXJ9A',
    image: 'sedes-1.webp',
  },
  {
    id: 2,
    title: 'Emilio Lamarca',
    adress: 'Emilio Lamarca 698',
    city: 'Flores',
    tel: '1154823625',
    whatsapp: '1154823625',
    schedule:
      'Horario: Lunes a Viernes 07:00 a 17:00hs | Sábados 08:00 a 13:00hs | Domingos 07:00 a 17:00hs',
    appointment: 'https://maps.app.goo.gl/K15nicEoja6Mm5As8',
    image: 'sedes-2.webp',
  },
];

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
