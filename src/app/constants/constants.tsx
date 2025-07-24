export const company = {
  dark: true,
  darkmode: false,
  shortAdress: true,
  favicon: false,
  price: false,
  id: 'borsottoautos',
  name: 'Borsotto Autos',
  adress: 'Mendoza 1359',
  city: 'Gral Roca-Rio Negro',
  email: 'autosborsotto@gmail.com',
  instagram: 'borsottoautos',
  facebook: 'https://www.facebook.com/BorsottoAutos/',
  whatsapp: ['2984642420', '2984420677'],
  googlemapsLink: 'https://maps.app.goo.gl/F4XP6iJzh8DxRUej6',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6198.5091487304!2d-67.56448526572188!3d-39.03231468751525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a03b6e557f5f3%3A0x12d8450b122823d5!2sBorsotto%20Autos!5e0!3m2!1sen!2sar!4v1753319228496!5m2!1sen!2sar',
  openDays: [
    { day: 'Lunes', hours: ['9:30 a 12:30 y 17 a 20hs'] },
    { day: 'Martes', hours: ['9:30 a 12:30 y 17 a 20hs'] },
    { day: 'Miércoles', hours: ['9:30 a 12:30 y 17 a 20hs'] },
    { day: 'Jueves', hours: ['9:30 a 12:30 y 17 a 20hs'] },
    { day: 'Viernes', hours: ['9:30 a 12:30 y 17 a 20hs'] },
    { day: 'Sábado', hours: ['9 a 13hs'] },
    // { day: 'Domingo', hours: ['10:00 a 19:00'] },
  ],
  footer:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://dealership.agenciagrvity.com';
export const TENANT = 'vitacars';

export const metadataCompany = {
  metadataBase: 'https://borsottoautos.vercel.app/',
  title: 'Borsotto Autos - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

// Reemplaza los vehiculos del 1 al 6 en el orden que te paso acontinuacion. Esos textos tiene que ir tal cual en la descripcion de cada uno. El name del vehiculo tiene que estar en Title Case. No agregues ni quites ningun atributo, unicamente tenes que actualizar los valores para que coincidan con el vehiculo. Si no te paso precio o kilometraje pone 999999:

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
