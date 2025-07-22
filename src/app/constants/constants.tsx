export const company = {
  dark: true,
  darkmode: true,
  shortAdress: true,
  favicon: true,
  price: true,
  id: 'brentacars',
  name: 'Brenta Cars',
  adress: 'Av. Bartolomé Mitre 853',
  city: 'Vicente López',
  email: null,
  instagram: 'brentacars_vendetuautoba',
  facebook: null,
  whatsapp: ['1127766626'],
  googlemapsLink: 'https://maps.app.goo.gl/qtvDKqWGxQA4NdGe6',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9295.44912119456!2d-58.509230844371395!3d-34.54247527941906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6d773340005%3A0xd2bd33830444cfa!2sAv.%20Bartolom%C3%A9%20Mitre%20853%2C%20B1603%20Villa%20Martelli%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1753121270709!5m2!1ses-419!2sar',
  openDays: [
    { day: 'Lunes', hours: ['09:00 a 18:00hs'] },
    { day: 'Martes', hours: ['09:00 a 18:00h'] },
    { day: 'Miércoles', hours: ['09:00 a 18:00h'] },
    { day: 'Jueves', hours: ['09:00 a 18:00h'] },
    { day: 'Viernes', hours: ['09:00 a 18:00h'] },
    { day: 'Sábado', hours: ['09:00 a 13:00hs'] },
    // { day: 'Domingo', hours: ['10:00 a 19:00'] },
  ],
  footer:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://dealership.agenciagrvity.com';
export const TENANT = 'vitacars';

export const metadataCompany = {
  metadataBase: 'https://brentacars.vercel.app/',
  title: 'Brenta Cars - Compra y Venta de Autos',
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
