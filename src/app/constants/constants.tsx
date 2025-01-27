export const company = {
  dark: true,
  id: 'dm-automotores',
  name: 'DM Automotores',
  adress: 'Av. La plata 519',
  city: 'Ostende',
  email: null,
  instagram: 'dm_automotores1',
  facebook: null,
  whatsapp: ['2236067804'],
  googlemapsLink: 'https://maps.app.goo.gl/riXKmePLHyTDym7x7',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12724.417679488646!2d-56.8976975128418!3d-37.1264307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9daf72d2c8c5%3A0x2447c7e2078aab05!2sDM%20automotores!5e0!3m2!1ses-419!2sar!4v1737676092149!5m2!1ses-419!2sar',
  openDays: [
    { day: 'Lunes', hours: ['08:00 a 20:00'] },
    { day: 'Martes', hours: ['08:00 a 20:00'] },
    { day: 'Miércoles', hours: ['08:00 a 20:00'] },
    { day: 'Jueves', hours: ['08:00 a 20:00'] },
    { day: 'Viernes', hours: ['08:00 a 20:00'] },
    // { day: 'Sábado', hours: ['09:00 a 13:00'] },
    // { day: 'Domingo', hours: ['08:30 a 13:00', '17:00 a 21:00'] },
  ],
  footer: 'Compra y Venta de Autos, Seguridad y Confianza en Cada Kilómetro.',
};

export const metadataCompany = {
  metadataBase: 'https://dm-automotores.vercel.app/',
  title: 'DM Automotores - Compra y Venta de Autos',
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
