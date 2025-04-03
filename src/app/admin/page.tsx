'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MOCK_STATS } from '@/app/constants/admin';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir al dashboard
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto'></div>
      </motion.div>
    </div>
  );
}
