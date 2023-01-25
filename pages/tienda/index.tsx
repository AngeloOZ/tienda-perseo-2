import { NextPage } from 'next';
import React, { useState } from 'react';
import { IProduct } from 'src/@types/product';
import { ShopProducts } from 'src/components/e-commerce/shop';
import MainLayout from 'src/layouts/main/MainLayout';

const index: NextPage = () => {
  const [stateViewCart, setStateViewCart] = useState(false);
  const handleShowCart = () => {
    setStateViewCart(!stateViewCart);
  };

  const products: IProduct[] = [
    {
      id: '1',
      name: 'Epson® Workforce® Pro WF-3820 Wireless Color Inkjet All-in-One Printer, Black',    
      available: 5,
      price: 109.95,
      priceSale: 100.9,    
      description: '',
      images: [
        'https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/prod-2354-printer-epson-wf-c4810-lf-800x620.png?fmt=png-alpha&wid=800&hei=620',
        'https://imageio.forbes.com/blogs-images/davidhochman/files/2018/01/6042206_rd-1200x938.jpg?format=jpg&width=960',
      ],
      cover: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/prod-2354-printer-epson-wf-c4810-lf-800x620.png?fmt=png-alpha&wid=800&hei=620',
      category: 'Impresoras',
      status: true,
      totalRating: 3,    
    }
  ];

  return (
    <MainLayout>
      <ShopProducts products={products} />
    </MainLayout>
  );
};

export default index;
