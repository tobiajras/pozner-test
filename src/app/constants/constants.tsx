export const company = {
  dark: false,
  darkmode: true,
  shortAdress: true,
  favicon: false,
  id: 'custommotors',
  name: 'Custom Motors',
  adress: 'Bolívar 1740',
  city: 'CABA',
  email: 'custommotorsok@gmail.com',
  instagram: 'cmotors_ok',
  facebook: 'https://www.facebook.com/profile.php?id=61560687316397',
  whatsapp: ['1135105482'],
  googlemapsLink: 'https://maps.app.goo.gl/thL4ENPVKoJsetu77',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26264.243341933325!2d-58.37220725444661!3d-34.62867160465521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb0054e1a545%3A0xf854c8af0280a266!2sCustom%20Motors!5e0!3m2!1sen!2sar!4v1747496324993!5m2!1sen!2sar',
  openDays: [
    { day: 'Lunes', hours: ['11:00 a 18:00'] },
    { day: 'Martes', hours: ['11:00 a 18:00'] },
    { day: 'Miércoles', hours: ['11:00 a 18:00'] },
    { day: 'Jueves', hours: ['11:00 a 18:00'] },
    { day: 'Viernes', hours: ['11:00 a 18:00'] },
    { day: 'Sábado', hours: ['11:00 a 14:00'] },
    // { day: 'Domingo', hours: ['10:00 a 19:00'] },
  ],
  footer:
    'Compra y Venta de Motos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://dealership.agenciagrvity.com';
export const TENANT = 'custommotors';

export const metadataCompany = {
  metadataBase: 'https://custommotors.vercel.app/',
  title: 'Custom Motors - Compra y Venta de Motos',
  description:
    'Compra y Venta de Motos: Vehículos seleccionados, atención personalizada.',
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
      'Nos encargamos de preparar profesionalmente tu vehículo para la venta. Realizamos una revisión técnica completa, limpieza detallada, y presentamos tu moto de la mejor manera para maximizar su valor en el mercado.',
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
      'Sí, tomamos tu usado como parte de pago por un vehículo de nuestra selección. Realizamos una tasación justa de tu moto actual y te ofrecemos las mejores condiciones para facilitar tu nueva compra.',
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
