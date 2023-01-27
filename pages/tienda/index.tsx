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
  //categoria: ICategoria[];
  products: IProduct[];
}

const index: NextPage<Props> = ({products}) => {





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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get('http://localhost:8084/api/products/');  

  /* axios
    .get('http://localhost:8084/api/products/')
    .then(function (response) {
      // manejar respuesta exitosa
      console.log(JSON.parse(response.data[0].images).images[0
      ]);
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    }); */

  return {
    props: {
      products: res.data
    },
  };
};

export default index;
