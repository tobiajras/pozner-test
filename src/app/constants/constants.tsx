export const company = {
  dark: true,
  darkmode: true,
  shortAdress: true,
  favicon: false,
  price: false,
  id: 'maddalenaautomotores',
  name: 'Maddalena Automotores',
  adress: 'Figueroa Alcorta 360',
  city: 'Bell Ville - Cba',
  email: 'maddalenaautomotores@hotmail.com',
  instagram: 'maddalenaautomotores',
  facebook: 'https://www.facebook.com/madalenaautomomotores/',
  whatsapp: ['3537654068'],
  googlemapsLink: 'https://maps.app.goo.gl/VowARv5kqtf137wq9',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.951245113914!2d-62.68486!3d-32.634121799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cbfbce0d4e80c7%3A0x456c71c4c09c8463!2sMADDALENA%20AUTOMOTORES!5e0!3m2!1ses-419!2sar!4v1752844361411!5m2!1ses-419!2sar',
  openDays: [
    { day: 'Lunes', hours: ['8:00 a 12:00 y 16 a 20hs'] },
    { day: 'Martes', hours: ['8:00 a 12:00 y 16 a 20hs'] },
    { day: 'Miércoles', hours: ['8:00 a 12:00 y 16 a 20hs'] },
    { day: 'Jueves', hours: ['8:00 a 12:00 y 16 a 20hs'] },
    { day: 'Viernes', hours: ['8:00 a 12:00 y 16 a 20hs'] },
    { day: 'Sábado', hours: ['9 a 12hs'] },
    // { day: 'Domingo', hours: ['10:00 a 19:00'] },
  ],
  footer:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://dealership.agenciagrvity.com';
export const TENANT = 'vitacars';

export const metadataCompany = {
  metadataBase: 'https://maddalenaautomotores.vercel.app/',
  title: 'Maddalena Automotores - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

// Reemplaza los vehiculos del 1 al 12 en el orden que te paso acontinuacion. Esos textos tiene que ir tal cual en la descripcion de cada uno. El name del vehiculo tiene que estar en Title Case. No agregues ni quites ningun atributo, unicamente tenes que actualizar los valores para que coincidan con el vehiculo. Si no te paso precio o kilometraje pone 999999:

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
