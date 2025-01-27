export const company = {
  dark: false,
  id: 'landa-automotores',
  name: 'Landa Automotores',
  adress: 'Rawson 140 Norte',
  city: 'San Juan',
  email: 'landaautomotores@yahoo.com.ar',
  instagram: 'landa_automotores',
  facebook: null,
  whatsapp: ['2645446818', '2645446816', '2645250630', '2644593747'],
  googlemapsLink: 'https://maps.app.goo.gl/26MeDyQPg99cYLq56',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.7199021749675!2d-68.51823212401747!3d-31.53185210184342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96816a85cba225df%3A0x2553ed9e5779a96f!2sLanda%20Automotores!5e0!3m2!1ses-419!2sar!4v1737663971676!5m2!1ses-419!2sar',
  openDays: [
    { day: 'Lunes', hours: ['09:00 a 13:30', '17:00 a 21:00'] },
    { day: 'Martes', hours: ['09:00 a 13:30', '17:00 a 21:00'] },
    { day: 'Miércoles', hours: ['09:00 a 13:30', '17:00 a 21:00'] },
    { day: 'Jueves', hours: ['09:00 a 13:30', '17:00 a 21:00'] },
    { day: 'Viernes', hours: ['09:00 a 13:30', '17:00 a 21:00'] },
    { day: 'Sábado', hours: ['09:00 a 14:00'] },

    // { day: 'Domingo', hours: ['08:30 a 13:00', '17:00 a 21:00'] },
  ],
  footer: 'Compra y Venta de Autos, Seguridad y Confianza en Cada Kilómetro.',
};

export const metadataCompany = {
  metadataBase: 'https://landa-automotores.vercel.app/',
  title: 'Landa Automotores - Compra y Venta de Autos',
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
