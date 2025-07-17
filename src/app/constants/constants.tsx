export const company = {
  dark: true,
  darkmode: true,
  shortAdress: true,
  favicon: false,
  id: 'vitacars',
  name: 'VITA CARS',
  adress: 'Ledesma 3120',
  city: 'Saladillo',
  email: null,
  instagram: 'vitacarsm',
  facebook: 'https://www.facebook.com/matias.N.vita/',
  whatsapp: ['2345458113'],
  googlemapsLink: 'https://maps.app.goo.gl/Q8bduW2v1cNPS6VV7',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1018305.7015445657!2d-59.95761477369754!3d-35.46323443543396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bde1300b59b33f%3A0xe4308df4f66e6fb!2sVitaCars!5e0!3m2!1ses-419!2sar!4v1752200379288!5m2!1ses-419!2sar',
  openDays: [
    { day: 'Lunes', hours: ['8:30 a 12:30 y 16 a 20hs'] },
    { day: 'Martes', hours: ['8:30 a 12:30 y 16 a 20hs'] },
    { day: 'Miércoles', hours: ['8:30 a 12:30 y 16 a 20hs'] },
    { day: 'Jueves', hours: ['8:30 a 12:30 y 16 a 20hs'] },
    { day: 'Viernes', hours: ['8:30 a 12:30 y 16 a 20hs'] },
    { day: 'Sábado', hours: ['9 a 13hs'] },
    // { day: 'Domingo', hours: ['10:00 a 19:00'] },
  ],
  footer:
    'Compra y Venta de Motos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://dealership.agenciagrvity.com';
export const TENANT = 'vitacars';

export const metadataCompany = {
  metadataBase: 'https://vitacars.vercel.app/',
  title: 'VITA CARS - Compra y Venta de Motos',
  description:
    'Compra y Venta de Motos: Vehículos seleccionados, atención personalizada.',
};

export const preguntas = [
  {
    id: 'preg-1',
    question: '¿Qué opciones de pago ofrecen?',
    answer:
      'Ofrecemos diferentes opciones de pago para adaptarnos a tus necesidades. Consultanos sobre las alternativas disponibles y te asesoramos para encontrar la mejor opción para ti.',
  },
  {
    id: 'preg-2',
    question: '¿Cómo verifican el estado de los vehículos?',
    answer:
      'Todos nuestros vehículos son revisados antes de ser ofrecidos. Realizamos las verificaciones necesarias para asegurar que estén en las mejores condiciones para nuestros clientes.',
  },
  {
    id: 'preg-3',
    question: '¿Incluyen algún tipo de garantía?',
    answer:
      'Sí, nuestros vehículos incluyen garantía según corresponda. Te informamos sobre los términos y condiciones al momento de la compra para tu tranquilidad.',
  },
  {
    id: 'preg-4',
    question: '¿Puedo ver el vehículo antes de decidir?',
    answer:
      'Por supuesto, te invitamos a conocer nuestros vehículos personalmente. Coordina una visita con nuestro equipo y te mostramos todo lo que necesites saber.',
  },
  {
    id: 'preg-5',
    question: '¿Brindan asesoramiento después de la compra?',
    answer:
      'Sí, nuestro compromiso continúa después de la compra. Estamos disponibles para resolver tus dudas y brindarte el apoyo que necesites con tu vehículo.',
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
    title: 'Catálogo',
    url: '/catalogo',
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
    button: true,
  },
];
