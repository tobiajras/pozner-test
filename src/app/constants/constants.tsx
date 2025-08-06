export const company = {
  dark: false,
  darkmode: true,
  shortAdress: true,
  favicon: true,
  price: true,
  objectCover: '50%',
  id: 'dangelmotors',
  name: 'D_ANGEL MOTORS',
  adress: 'Av. Libertador Norte 102',
  city: 'Gral Alvear - Mendoza',
  email: 'dangelmotors@gmail.com',
  instagram: 'dangelmotors',
  facebook: 'https://www.facebook.com/profile.php?id=61577643361938',
  whatsapp: ['2625407443'],
  googlemapsLink: 'https://maps.app.goo.gl/LxHbfyHj5GSZcxZr6',
  googlemaps:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.193980153449!2d-67.69220622337791!3d-34.97680557729904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967817710cd010a9%3A0x4d914a85bf8f3f84!2sD_Angel%20Motors!5e0!3m2!1sen!2sar!4v1754449617835!5m2!1sen!2sar',
  openDays: [
    { day: 'Lunes', hours: ['9 a 13 y 16 a 20hs'] },
    { day: 'Martes', hours: ['9 a 13 y 16 a 20h'] },
    { day: 'Miércoles', hours: ['9 a 13 y 16 a 20h'] },
    { day: 'Jueves', hours: ['9 a 13 y 16 a 20h'] },
    { day: 'Viernes', hours: ['9 a 13 y 16 a 20h'] },
    { day: 'Sábado', hours: ['9 a 13hs'] },
    // { day: 'Domingo', hours: ['09:00 a 13:00hs'] },
  ],
  footer:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://dealership.agenciagrvity.com';
export const TENANT = 'accotto-automotores';

export const metadataCompany = {
  metadataBase: 'https://dangelmotors.vercel.app/',
  title: 'D_ANGEL MOTORS - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

// Cambie el archivo data.json, necesito que actualices la informacion de catalogo.json. Las images tomalas de images de data.json, la descripcion tomala de caption de data.json, pero necesito que el texto este parseado, que no este todo junto sin espacios y saltos de linea. En name pone la marca y el modelo del vehiculo en title case, marca, marcaId todo esto acorde a la informacion de caption. Si en caption no se dice kilometraje o precio pone 999999, categoria estimala para el vehiculo (categorias tipicas de vehiculos en argentina. como utilitario, deportivo, suv, hatchback, etc). Transmision, motor, combustible y puertas estimalas acorde al vehiculo. La cantidad de vehiculos tiene que ser la de data.json, si en catalogo.json hay otros vehiculos removelos, los vehiclos de catalogo json tienen que ser los mismos que en data.json. No hagas un script, simplemente actualizalo con ia.

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
