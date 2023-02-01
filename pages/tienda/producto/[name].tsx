import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import Head from 'next/head';
import { Grid, Container } from '@mui/material';

import { CartContext } from 'context';
import { IProduct } from 'src/@types/product';
import MainLayout from 'src/layouts/main/MainLayout';
import { Descripcion } from 'custom/components/Descripcion';

import { useSettingsContext } from '../../../src/components/settings';
import { ProductDetailsSummary, ProductDetailsCarousel } from '../../../src/sections/details';
import { obtenerProductoSlug } from 'pages/api/products/[name]';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { obtenerProductosLocal } from 'pages/api/products';

import { ParsedUrlQuery } from 'querystring';

interface Props {
  producto: IProduct;
}

export default function EcommerceProductDetailsPage({ producto }: Props) {
  const { themeStretch } = useSettingsContext();

  const ctx = useContext(CartContext);
  const { cart, handleAddCart, handleIncreaseQuantity, handleDecreaseQuantity } = ctx;

  return (
    <>
      <Head>
        <title>{`Tienda Perseo: ${producto?.name || ''} | Minimal UI`}</title>
      </Head>
      <MainLayout>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          {producto && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={7}>
                <ProductDetailsCarousel product={producto} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <ProductDetailsSummary
                  product={producto}
                  cart={cart}
                  onAddCart={handleAddCart}
                  onGotoStep={() => {}}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                />
              </Grid>
            </Grid>
          )}
          <Descripcion product={producto} />
        </Container>
      </MainLayout>
    </>
  );
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const products = await obtenerProductosLocal();

    return{
      paths: products.map((prod) => ({params: {name: prod.slug}})),
      fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({params})=>{
  const { name } = params as { name: string };  
  const products = await  obtenerProductoSlug(name);
  
  const images = JSON.parse(products?.images!);
  const producto = { ...products, images }; 

  return{
    props: {
      producto
    }
  }
}