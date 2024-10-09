export const company = {
  id: 'rondo-cafe',
  name: 'Rondó Café',
  adress: 'Uruguay 1048',
  city: 'Recoleta',
  telephone: '1163587679',
  email: 'rondddo@gmail.com',
  instagram: 'rondddocafe',
  facebook: 'rondddo',
  whatsapp: '1163587679',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104993.00811770374!2d-58.50595091093747!3d-34.679154356730194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb8031cd6d19%3A0xe1add1b4e0c98ebe!2sRond%C3%B3%20Cafe!5e0!3m2!1ses!2sar!4v1728473840313!5m2!1ses!2sar',
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
  text: 'En Rondó Café, nos enorgullecemos de nuestra larga trayectoria con los más altos estándares de calidad. Con amplia experiencia en el rubro, nos hemos comprometido a brindar un ambiente ideal para que disfrutes de nuestra gastronomía con amigos y familiares.',
};

export const metadataCompany = {
  metadataBase: 'https://rondo-cafe.vercel.app/',
  title: 'Rondó Café - Café de Especialidad',
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
