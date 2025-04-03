'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Credenciales de prueba
      if (email === 'admin@fratelli.com' && password === 'admin123') {
        Cookies.set('admin-auth', 'true', { expires: 7 });
        router.push('/admin/dashboard');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-color-bg-primary py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-color-text'>
            Panel de Administración
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Ingresa tus credenciales para acceder
          </p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-color-text rounded-t-md focus:outline-none focus:ring-color-primary focus:border-color-primary focus:z-10 sm:text-sm'
                placeholder='Email'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Contraseña
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-color-text rounded-b-md focus:outline-none focus:ring-color-primary focus:border-color-primary focus:z-10 sm:text-sm'
                placeholder='Contraseña'
              />
            </div>
          </div>

          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}

          <div>
            <button
              type='submit'
              disabled={loading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-color-primary hover:bg-color-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-primary disabled:opacity-50'
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        <div className='text-sm text-center text-gray-500'>
          <p>Credenciales de prueba:</p>
          <p>Email: admin@fratelli.com</p>
          <p>Contraseña: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
