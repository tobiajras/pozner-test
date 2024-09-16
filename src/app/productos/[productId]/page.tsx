import React from 'react';

const ProductId = ({ params }) => {
  return <div className='text-3xl'>{params.productId}</div>;
};

export default ProductId;
