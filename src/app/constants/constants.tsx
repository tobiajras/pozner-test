export const company = {
  dark: true,
  id: 'nantes-automotores',
  name: 'Nantes Autos',
  adress: 'Av. Luro 2220',
  city: 'Santa Rosa',
  email: null,
  instagram: 'nantes.automotores',
  facebook: null,
  whatsapp: ['2954329654'],
  googlemapsLink: 'https://maps.app.goo.gl/BDFRuahnTSciCyVB6',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!4v1737876303009!6m8!1m7!1stDfZRY1ISYocVVV6cqA3-g!2m2!1d-36.63904904201097!2d-64.28263514516523!3f272.9735538803946!4f1.0782819754048205!5f0.7820865974627469',
  openDays: [
    { day: 'Lunes', hours: ['08:00 a 20:00'] },
    { day: 'Martes', hours: ['08:00 a 20:00'] },
    { day: 'Miércoles', hours: ['08:00 a 20:00'] },
    { day: 'Jueves', hours: ['08:00 a 20:00'] },
    { day: 'Viernes', hours: ['08:00 a 20:00'] },
    { day: 'Sábado', hours: ['08:00 a 13:00'] },
    // { day: 'Domingo', hours: ['08:30 a 13:00', '17:00 a 21:00'] },
  ],
  footer: 'Compra y Venta de Autos, Seguridad y Confianza en Cada Kilómetro.',
};

export const metadataCompany = {
  metadataBase: 'https://nantes-automotores.vercel.app/',
  title: 'Nantes Autos - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos, Seguridad y Confianza en Cada Kilómetro.',
};

export const preguntas = [
  {
    id: 'preg-1',
    question: '¿Qué tipo de vehículos venden?',
    answer:
      'Tenemos una variedad de vehículos, desde autos y camionetas hasta utilitarios y autos usados. Todos están revisados y listos para salir a la calle.',
  },
  {
    id: 'preg-2',
    question: '¿Cómo puedo encontrar el auto que busco?',
    answer:
      'Podés acercarte a nuestra sucursal, donde te ayudamos a encontrar el auto que mejor se ajuste a lo que necesitas. ¡Te asesoramos en todo el proceso!',
  },
  {
    id: 'preg-3',
    question: '¿Qué documentos necesito para comprar un auto?',
    answer:
      'Con tu DNI y, si optás por financiarlo, solo te pedimos algunos papeles más como el recibo de sueldo y un comprobante de domicilio. Te acompañamos en cada paso.',
  },
  {
    id: 'preg-4',
    question: '¿Tienen opciones de financiación?',
    answer:
      'Sí, tenemos planes de financiación a medida. Contamos con varias opciones para que encuentres la que mejor se adapte a tu bolsillo.',
  },
  {
    id: 'preg-5',
    question: '¿Los autos tienen garantía?',
    answer:
      'Sí, todos nuestros vehículos están revisados y cuentan con garantía, para que puedas estar tranquilo con tu compra.',
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
