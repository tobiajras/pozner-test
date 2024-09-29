'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

import { company } from '../constants/constants';
import CloseIcon from '@/components/icons/CloseIcon';
import WhatsappIcon from '@/components/icons/WhatsappIcon';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (
    product: any,
    newQuantity: number,
    color?: string
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(product.id, color);
    } else {
      const quantityDiff = newQuantity - product.quantity;
      addToCart(product, quantityDiff, color);
    }
  };

  const getImageUrl = (item: any) => {
    if (item.color && item.colors && item.colors[item.color]) {
      return `/assets/products/${item.colors[item.color][0]}`;
    }
    return `/assets/products/${item.image_url || 'default.jpg'}`;
  };

  const generateOrderMessage = () => {
    const now = new Date();
    const orderNumber = `${now.getDate().toString().padStart(2, '0')}${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}${now.getFullYear().toString().slice(-2)}-${now
      .getHours()
      .toString()
      .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    let message = `📝 Pedido #${orderNumber}:\n`;

    cart.forEach((item) => {
      message += `◆ ${item.name}\n`;
      message += `    - Cantidad: ${item.quantity}\n`;
      message += `    - Precio unitario: $${item.price.toLocaleString(
        'es-ES'
      )}\n`;
    });

    message += '--------------------------------\n';
    message += `💰 Total: $${total.toLocaleString('es-ES')}`;

    return encodeURIComponent(message);
  };

  const sendOrderToWhatsApp = () => {
    const message = generateOrderMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5491138596093&text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <section className='flex justify-center my-20'>
      <div className=''>
        <h2 className='text-2xl font-semibold text-color-title mb-3'>
          Tu Carrito
        </h2>
        <hr />
        {cart.length === 0 ? (
          <p className='text-gray-500'>Tu carrito está vacío</p>
        ) : (
          <section className='flex flex-col gap-10 mt-10'>
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className='flex items-center'
              >
                <div className='w-32 h-32 bg-[#f6f6f6] p-5'>
                  <Image
                    src={getImageUrl(item)}
                    alt={item.name}
                    width={80}
                    height={80}
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='ml-10 w-96 lg:w-[500px]'>
                  <h3 className='font-semibold text-color-title line-clamp-1'>
                    {item.name}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    {item.color && `Color: ${item.color}`}
                  </p>
                </div>
                <p className='font-semibold w-28 mr-5 text-color-title'>
                  ${(item.price * item.quantity).toLocaleString('es-ES')}
                </p>
                <div className='flex items-center border py-2 px-6 rounded'>
                  <button
                    onClick={() =>
                      updateQuantity(item, item.quantity - 1, item.color)
                    }
                    className='font-semibold text-2xl hover:text-color-title transition-colors w-4'
                  >
                    -
                  </button>
                  <span className='mx-2 text-color-title font-medium text-center w-10'>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item, item.quantity + 1, item.color)
                    }
                    className='font-semibold text-2xl hover:text-color-title transition-colors w-4'
                  >
                    +
                  </button>
                </div>
                <div className='text-right'>
                  <button
                    onClick={() => removeFromCart(item.id, item.color)}
                    className='bg-[#f6f6f6] p-2 hover:bg-red-100 hover:text-color-title transition-colors ml-3'
                  >
                    <CloseIcon className='w-7 h-7' />
                  </button>
                </div>
              </div>
            ))}
            <hr />
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <h3 className='text-xl font-semibold'>Total:</h3>
                <p className='text-xl font-semibold text-color-title'>
                  ${total.toLocaleString('es-ES')}
                </p>
              </div>
              <button
                onClick={sendOrderToWhatsApp}
                className='flex items-center gap-3 bg-[#00a884] text-white px-14 py-5 rounded hover:bg-[#25D366] transition-colors font-medium'
              >
                <WhatsappIcon className='w-7 h-7' />
                Enviar Pedido por WhatsApp
              </button>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default Cart;
