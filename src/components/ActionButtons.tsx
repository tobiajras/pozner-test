import Link from 'next/link';
import Image from 'next/image';

const ActionButtons = () => {
  const buttons = [
    {
      id: 1,
      title: 'Comprá',
      subtitle: 'tu próximo auto',
      image: '/assets/images/inicio-compra.webp',
      href: '/catalogo',
    },
    {
      id: 2,
      title: 'Vendé',
      subtitle: 'tu vehículo',
      image: '/assets/images/inicio-venta.webp',
      href: '/venta',
    },
    {
      id: 3,
      title: 'Consigná',
      subtitle: 'tu vehículo',
      image: '/assets/images/inicio-consignacion.webp',
      href: '/consignacion',
    },
  ];

  return (
    <section className='w-full -mt-24 lg:-mt-28 relative z-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10'>
        <div className='grid grid-cols-1 lg:grid-cols-3 place-items-center gap-4 md:gap-6'>
          {buttons.map((button) => (
            <Link
              key={button.id}
              href={button.href}
              className='group relative h-48 sm:h-52 md:h-56 w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden rounded-xl border border-neutral-600 transition-transform mx-auto'
            >
              <Image
                priority
                src={button.image}
                alt={button.title}
                fill
                className='object-cover brightness-[0.6] group-hover:brightness-[0.5] group-hover:scale-105 transition-all duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
              <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
                <h3 className='text-3xl md:text-4xl font-bold'>
                  {button.title}
                </h3>
                <p className='text-lg md:text-xl text-white/90'>
                  {button.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionButtons;
