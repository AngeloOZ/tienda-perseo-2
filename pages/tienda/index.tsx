import { NextPage } from 'next';
import React, { useState } from 'react';
import axios from 'axios';
import { ICategoria, IProduct } from 'src/@types/product';
import { ShopProducts } from 'src/components/e-commerce/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormasPago from 'custom/components/principal/FormasPago';
import { Categoria } from 'custom/components/principal/Categoria';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

interface Props {
  categoria: ICategoria[];
}

//const index: NextPage<Props> = ({ categoria }) => {
const index: NextPage<Props> = () => {
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
      cover:
        'https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/prod-2354-printer-epson-wf-c4810-lf-800x620.png?fmt=png-alpha&wid=800&hei=620',
      category: 'Impresoras',
      status: true,
      totalRating: 3,
    },
  ];

  const categoria: ICategoria[] = [
    {
      id: '1',
      nombre: 'Categoria1',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '2',
      nombre: 'Categoria2',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '3',
      nombre: 'Categoria3',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '4',
      nombre: 'Categoria4',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '5',
      nombre: 'Categoria5',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    
    
  ];

  return (
    <MainLayout>
      <ImagenPricipal />
         <FormasPago />      
       <Grid container justifyContent="center" p={2}>
          <Categoria categoria={categoria} />
      </Grid>
      <ShopProducts products={products} />
    </MainLayout>
  );
};

export default index;
