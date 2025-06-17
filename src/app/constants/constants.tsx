export const company = {
  dark: true,
  darkmode: true,
  shortAdress: true,
  favicon: false,
  id: 'speed-motors',
  name: 'SPEED MOTORS',
  adress: null,
  city: null,
  email: 'ventas@speed-motors.com.ar',
  instagram: 'speed.motors',
  facebook: 'https://www.facebook.com/speedmotorsconcesionaria/',
  whatsapp: ['1170964444'],
  googlemapsLink: null,
  googlemaps: null,
  openDays: null,
  footer:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const API_BASE_URL = 'https://speedmotors.agenciagrvity.com';

export const sedes = [
  {
    id: 1,
    title: 'Speed Motors Puerto Madero',
    adress: 'Aimé Painé 1280',
    city: 'Puerto Madero',
    tel: '1170964444',
    whatsapp: '1170964444',
    schedule: ['Lunes a Viernes 10:00 a 19:00hs', 'Sábados 10:00 a 14:00hs'],
    appointment: 'https://maps.app.goo.gl/jHfmymCGeq2FjSeMA',
    images: ['sede-1-1.webp', 'sede-1-2.webp', 'sede-1-3.webp'],
  },
  {
    id: 2,
    title: 'Speed Motors Villa Luro',
    adress: 'Av. Rivadavia 10424',
    city: 'Villa Luro',
    tel: '1123225179',
    whatsapp: '1123225179',
    schedule: ['Lunes a Viernes 10:00 a 19:00hs', 'Sábados 10:00 a 14:00hs'],
    appointment: 'https://maps.app.goo.gl/8US1V9M6Hk9JUFS68',
    images: ['sede-2-1.webp', 'sede-2-2.webp', 'sede-2-3.webp'],
  },
];

export const metadataCompany = {
  metadataBase: 'https://www.speedmotors.com.ar/',
  title: 'Speed Motors - Compra y Venta de Autos',
  description:
    'Compra y Venta de Autos: Vehículos seleccionados, atención personalizada.',
};

export const preguntas = [
  {
    id: 'preg-1',
    question: '¿Aceptan autos usados como parte de pago?',
    answer:
      'Sí, recibimos autos usados como parte de pago, siempre que estén en condiciones aptas para la venta o consignación.',
  },
  {
    id: 'preg-2',
    question: '¿Que es la consignación y cómo funciona?',
    answer:
      'La consignación es un servicio donde nos entregas tu auto para que nosotros nos encarguemos de venderlo. Cuando se venda, te entregamos el valor acordado.',
  },
  {
    id: 'preg-3',
    question: '¿Cuánto tiempo tarda la venta en consignación?',
    answer:
      'El tiempo depende del modelo y la demanda, pero normalmente puede variar entre 15 y 60 días. Te mantendremos informado durante todo el proceso.',
  },
  {
    id: 'preg-4',
    question: '¿Cómo se realiza la transferencia del vehículo?',
    answer:
      'Nos encargamos de todo el trámite de transferencia para que sea un proceso rápido y sin complicaciones de principio a fin.',
  },
  {
    id: 'preg-5',
    question: '¿Qué documentos necesito para consignar o vender mi auto?',
    answer:
      'Necesitarás presentar la documentación del vehículo (título de propiedad, cédula, comprobantes de pago de impuestos y patente al día).',
  },
  {
    id: 'preg-6',
    question: '¿Qué pasa si el auto no se vende en consignación?',
    answer:
      'Si el auto no se vende en el tiempo acordado, podemos devolverlo o renovar el plazo de consignación.',
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
