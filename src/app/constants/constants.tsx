export const company = {
  dark: true,
  darkmode: true,
  shortAdress: true,
  favicon: false,
  price: false,
  id: 'bullmotors',
  name: 'Bull Motors',
  adress: 'Martin Fierro 6645',
  city: 'Villa Bosch',
  email: 'bullmotors@outlook.es',
  instagram: 'bullmotors_arg',
  facebook: 'https://www.facebook.com/p/BullMotors-100063907813612/',
  whatsapp: ['1130253396', '1138034412'],
  googlemapsLink: 'https://maps.app.goo.gl/HtyWPCNJAADY8vwR9',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.8793141332985!2d-58.583305823393076!3d-34.58192015634893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb9b90608f535%3A0x9f007d391a3bbff8!2sBullMotors!5e0!3m2!1sen!2sar!4v1753708277995!5m2!1sen!2sar',
  openDays: [
    { day: 'Lunes', hours: ['08:30 a 19:00hs'] },
    { day: 'Martes', hours: ['08:30 a 19:00hs'] },
    { day: 'Miércoles', hours: ['08:30 a 19:00hs'] },
    { day: 'Jueves', hours: ['08:30 a 19:00hs'] },
    { day: 'Viernes', hours: ['08:30 a 19:00hs'] },
    { day: 'Sábado', hours: ['09:30 a 12:30hs'] },
    // { day: 'Domingo', hours: ['10:00 a 19:00'] },
  ],
  footer:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://dealership.agenciagrvity.com';
export const TENANT = 'accotto-automotores';

export const metadataCompany = {
  metadataBase: 'https://bullmotors.vercel.app/',
  title: 'Bull Motors - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

// Necesito que actualices la informacion de catalogo.json. Las images tomalas de images de data.json, la descripcion tomala tal cual de caption de data.json. En name pone la marca y el modelo del vehiculo en title case, marca, marcaId todo esto acorde a la informacion de caption. Si en caption no se dice kilometraje o precio pone 999999, categoria estimala para el vehiculo (categorias tipicas de vehiculos en argentina. como utilitario, deportivo, suv, hatchback, etc). Transmision, motor, combustible y puertas estimalas acorde al vehiculo. La cantidad de vehiculos tiene que ser la de data.json, los actuales de catalogo.json tenes que removerlos. No hagas un script, simplemente actualizalo con ia.

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
