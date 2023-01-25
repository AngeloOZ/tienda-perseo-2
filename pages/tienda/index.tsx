import { NextPage } from 'next';
import React, { useState } from 'react';
import { ICheckoutCartItem } from 'src/@types/product';
import { ShopProducts } from 'src/components/e-commerce/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormasPago from 'custom/components/principal/FormasPago';
import Categoria from 'custom/components/principal/Categoria';

const index: NextPage = () => {
  const [stateViewCart, setStateViewCart] = useState(false);
  const handleShowCart = () => {
    setStateViewCart(!stateViewCart);
  };

  const products: ICheckoutCartItem[] = [
    {
      id: '1',
      name: 'Epson',
      cover:
        'https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/prod-2354-printer-epson-wf-c4810-lf-800x620.png?fmt=png-alpha&wid=800&hei=620',
      available: 5,
      price: 109.95,
      quantity: 1,
      subtotal: 0,
    },

    {
      id: '2',
      name: 'Sneakers',
      cover:
        'https://paylessec.vtexassets.com/arquivos/ids/351896-800-800?v=637914449574030000&width=800&height=800&aspect=true',
      available: 8,
      price: 22.3,
      quantity: 1,
      subtotal: 0,
    },
  ];

  return (
    <MainLayout>
        <ImagenPricipal/> 
        <FormasPago/>
        <Categoria/>
      <ShopProducts products={products} />
    </MainLayout>
  );
};

export default index;
