// import React from 'react'
// import ProductCard from './ProductCard'
// import { useAppContext } from '../context/AppContext'

// const BestSeller = () => {
//   const {products} = useAppContext();
//   return (
//     <div className='mt-16'>
//         <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mad:gap-6 lg:grid-cols-5 mt-6'>
//           {products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(
//             <ProductCard key={index} product={product} />
//           ))}
//         </div>
      
//     </div>
//   )
// }

// export default BestSeller
import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();

  // Show loading message or fallback if products are not yet loaded
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="mt-16">
        <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
        <p className="mt-6 text-gray-500">Loading best sellers...</p>
      </div>
    );
  }

  // Filter and slice best sellers
  const bestSellers = products.filter(product => product.inStock).slice(0, 5);

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mad:gap-6 lg:grid-cols-5 mt-6'>
        {bestSellers.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
