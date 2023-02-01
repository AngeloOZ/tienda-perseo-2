import { GetStaticProps, GetStaticPaths } from 'next';
import { useContext } from 'react';
import Head from 'next/head';
import { Grid, Container } from '@mui/material';

import { CartContext } from 'context';
import { IProduct } from 'src/@types/product';
import MainLayout from 'src/layouts/main/MainLayout';
import { Descripcion } from 'custom/components/Descripcion';

import { obtenerProductoSlug } from 'pages/api/products/[name]';
import { obtenerProductosLocal } from 'pages/api/products';
import { ProductDetailsSummary, ProductDetailsCarousel } from '../../../src/sections/details';
import { useSettingsContext } from '../../../src/components/settings';


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
        <title>{`Tienda Perseo: ${producto?.name || ''}`}</title>
      </Head>
      <MainLayout>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          {producto && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <ProductDetailsCarousel product={producto} />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <ProductDetailsSummary
                  product={producto}
                  cart={cart}
                  onAddCart={handleAddCart}
                  onGotoStep={() => { }}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                />
              </Grid>
              <Grid item xs={12} >
                <Descripcion product={producto} />
              </Grid>
            </Grid>
          )}
        </Container>
      </MainLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const products = await obtenerProductosLocal();

  return {
    paths: products.map((prod) => ({ params: { name: prod.slug } })),
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const products = await obtenerProductoSlug(name);

  const images = JSON.parse(products?.images!);
  const producto = { ...products, images };

  return {
    props: {
      producto
    },
    revalidate: (60 * 60 * 24),
  }
}