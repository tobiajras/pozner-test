'use client';

import products from '@/data/products.json';
import { useEffect, useState } from 'react';

const ProductId = ({ params }) => {
  const [productById, setProductById] = useState(null);

  useEffect(() => {
    const product = products.find((product) => product.id === params.productId);
    setProductById(product);
  }, [params.productId]);

  return <div className='text-3xl'>{productById?.name}</div>;
};

export default ProductId;
