export const company = {
  dark: false,
  darkmode: true,
  shortAdress: true,
  favicon: false,
  id: 'microcentro-motors',
  name: 'Microcentro Motors',
  adress: 'Bartolomé Mitre 711',
  city: 'Microcentro',
  email: 'microcentromotors@microcentromotors.com',
  instagram: 'microcentromotors',
  facebook:
    'https://www.facebook.com/people/Microcentro-Motors/61552494278277/',
  whatsapp: ['1126470994'],
  googlemapsLink: 'https://maps.app.goo.gl/VMLuudGZCn1MrFqNA',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104980.75044980465!2d-58.483467944526645!3d-34.6888039323826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb233f34030d%3A0x9f9b1ed7d2dae6a4!2sMicrocentro%20Motors!5e0!3m2!1sen!2sar!4v1747234281610!5m2!1sen!2sar',
  openDays: [
    { day: 'Lunes', hours: ['08:00 a 18:00'] },
    { day: 'Martes', hours: ['08:00 a 18:00'] },
    { day: 'Miércoles', hours: ['08:00 a 18:00'] },
    { day: 'Jueves', hours: ['08:00 a 18:00'] },
    { day: 'Viernes', hours: ['08:00 a 18:00'] },
    { day: 'Sábado', hours: ['08:00 a 13:00'] },
    // { day: 'Domingo', hours: ['10:00 a 19:00'] },
  ],
  footer: 'Compra y Venta de Autos: Las mejores opciones, calidad garantizada.',
};

export const API_BASE_URL = 'https://microcentro.agenciagrvity.com';

export const metadataCompany = {
  metadataBase: 'https://microcentro-motors.vercel.app/',
  title: 'Microcentro Motors - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos: Las mejores opciones, calidad garantizada.',
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
    question: '¿Qué opciones de financiación ofrecen?',
    answer:
      'Ofrecemos distintas opciones de financiación adaptadas a tus necesidades. Trabajamos con varias entidades financieras para conseguirte la mejor tasa y plazo que se ajuste a tu presupuesto. Consultanos por los planes disponibles actualmente.',
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
