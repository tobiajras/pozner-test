'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// URL base del API
const API_BASE_URL = 'https://api.fratelliautomotores.com.ar';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // Usar username en lugar de email para coincidir con el API
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // Mostrar en consola lo que estamos enviando
    console.log('Enviando credenciales:', { username, password });

    try {
      // URL correcta del endpoint de login
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        // Enviar username y password exactamente como espera el API
        body: JSON.stringify({ username, password }),
      });

      // Obtener la respuesta como texto para depuración
      const responseText = await response.text();
      console.log('Respuesta del servidor (status):', response.status);
      console.log('Respuesta del servidor (headers):', response.headers);
      console.log(
        'Respuesta del servidor (body):',
        responseText.substring(0, 200)
      );

      let data;
      try {
        // Intentar parsear la respuesta como JSON
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parseando la respuesta:', parseError);
        throw new Error('La respuesta del servidor no es un JSON válido');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      console.log('Login exitoso, datos recibidos:', data);

      // Guardar token en cookies
      Cookies.set('admin-auth', data.token, { expires: 7 });

      // También guardar información de usuario si está disponible
      if (data.user) {
        Cookies.set('admin-user', JSON.stringify(data.user), { expires: 7 });
      }

      // Redirigir al dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error en login:', err);
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Panel de Administración
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Ingresa tus credenciales para acceder
          </p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='username' className='sr-only'>
                Usuario
              </label>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm'
                placeholder='Usuario'
                defaultValue='admin'
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
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm'
                placeholder='Contraseña'
                defaultValue='admin123'
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
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50'
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
