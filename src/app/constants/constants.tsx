export const company = {
  dark: true,
  darkmode: true,
  shortAdress: true,
  favicon: false,
  id: 'speed-motors',
  name: 'Speed Motors',
  adress: null,
  city: null,
  email: 'ventas@speed-motors.com.ar',
  instagram: 'speed.motors',
  facebook: 'https://www.facebook.com/speedmotorsconcesionaria/',
  whatsapp: ['1123225179', '1170964444'],
  googlemapsLink: null,
  googlemaps: null,
  openDays: null,
  footer:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://speedmotors.agenciagrvity.com';

export const sedes = [
  {
    id: 1,
    title: 'Speed Motors Puerto Madero',
    adress: 'Aimé Painé 1280',
    city: 'Puerto Madero',
    tel: '1170964444',
    whatsapp: '1170964444',
    schedule: ['Lunes a Viernes 10:00 a 19:00hs', 'Sábados 10:00 a 14:00hs'],
    appointment: 'https://maps.app.goo.gl/jHfmymCGeq2FjSeMA',
    images: ['sede-1-1.webp', 'sede-1-2.webp', 'sede-1-3.webp'],
  },
  {
    id: 2,
    title: 'Speed Motors Villa Luro',
    adress: 'Av. Rivadavia 10424',
    city: 'Villa Luro',
    tel: '1123225179',
    whatsapp: '1123225179',
    schedule: ['Lunes a Viernes 10:00 a 19:00hs', 'Sábados 10:00 a 14:00hs'],
    appointment: 'https://maps.app.goo.gl/8US1V9M6Hk9JUFS68',
    images: ['sede-2-1.webp', 'sede-2-2.webp', 'sede-2-3.webp'],
  },
];

export const metadataCompany = {
  metadataBase: 'https://www.speedmotors.com.ar/',
  title: 'Speed Motors - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const preguntas = [
  {
    id: 'preg-1',
    question: '¿Consignan vehículos?',
    answer:
      'Sí, consignamos tu vehículo sin costo. Nos encargamos de todo el proceso para que no tengas que preocuparte por nada. Te ofrecemos asesoramiento profesional y la tranquilidad de que tu auto estará en buenas manos.',
  },
  {
    id: 'preg-2',
    question: '¿Cómo preparan los vehículos para la venta?',
    answer:
      'Nos encargamos de preparar profesionalmente tu vehículo para la venta. Realizamos una revisión técnica completa, limpieza detallada, y presentamos tu auto de la mejor manera para maximizar su valor en el mercado.',
  },
  {
    id: 'preg-3',
    question: '¿Cómo manejan las transferencias de vehículos?',
    answer:
      'Una vez vendido el vehículo, nos encargamos personalmente de que se transfiera de la manera correcta, en tiempo y forma. Gestionamos toda la documentación necesaria y trámites legales para que tanto vendedor como comprador tengan total tranquilidad.',
  },
  {
    id: 'preg-4',
    question: '¿Toman vehículos usados como parte de pago?',
    answer:
      'Sí, tomamos tu usado como parte de pago por un vehículo de nuestra selección. Realizamos una tasación justa de tu auto actual y te ofrecemos las mejores condiciones para facilitar tu nueva compra.',
  },
  {
    id: 'preg-5',
    question: '¿Qué garantía ofrecen con los vehículos?',
    answer:
      'Todos nuestros vehículos cuentan con garantía mecánica que cubre los componentes principales del auto. Realizamos una inspección técnica exhaustiva antes de la entrega para asegurar el óptimo funcionamiento del vehículo.',
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
