'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

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

  return (
    <section className='my-20'>
      <div className='bg-white rounded-lg p-6 max-w-3xl mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>Tu Carrito</h2>
        {cart.length === 0 ? (
          <p className='text-gray-500'>Tu carrito está vacío</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className='flex items-center border-b py-4 '
              >
                <Image
                  src={getImageUrl(item)}
                  alt={item.name}
                  width={80}
                  height={80}
                  className='object-cover rounded'
                />
                <div className='ml-4 flex-grow'>
                  <h3 className='font-semibold'>{item.name}</h3>
                  <p className='text-sm text-gray-500'>
                    {item.color && `Color: ${item.color}`}
                  </p>
                  <div className='flex items-center mt-2'>
                    <button
                      onClick={() =>
                        updateQuantity(item, item.quantity - 1, item.color)
                      }
                      className='bg-gray-200 px-2 py-1 rounded'
                    >
                      -
                    </button>
                    <span className='mx-2'>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item, item.quantity + 1, item.color)
                      }
                      className='bg-gray-200 px-2 py-1 rounded'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-semibold'>
                    ${(item.price * item.quantity).toLocaleString('es-ES')}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id, item.color)}
                    className='text-red-500 text-sm mt-2'
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className='mt-6 flex justify-between items-center'>
              <h3 className='text-xl font-bold'>Total:</h3>
              <p className='text-xl font-bold'>
                ${total.toLocaleString('es-ES')}
              </p>
            </div>
            <div className='mt-6 flex justify-between'>
              <button
                onClick={clearCart}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
              >
                Vaciar Carrito
              </button>
              <button className='bg-color-primary text-white px-4 py-2 rounded hover:bg-color-primary-dark'>
                Proceder al Pago
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
