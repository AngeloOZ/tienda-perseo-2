import { GetServerSideProps } from 'next';
import { tiendaApi } from 'custom/api';
import { useContext } from 'react';
import Head from 'next/head';
import { Grid, Container } from '@mui/material';

import { CartContext } from 'src/context';
import { IProduct } from 'src/@types/product';
import MainLayout from 'src/layouts/main/MainLayout';
import { Descripcion } from 'custom/components/Descripcion';

import { useSettingsContext } from '../../../src/components/settings';
import { ProductDetailsSummary, ProductDetailsCarousel } from '../../../src/sections/details';

interface Props {
  product: IProduct;
}

export default function EcommerceProductDetailsPage({ product }: Props) {
  const { themeStretch } = useSettingsContext();

  const ctx = useContext(CartContext);
  const { cart, handleAddCart, handleIncreaseQuantity, handleDecreaseQuantity } = ctx;

  return (
    <>
      <Head>
        <title>{`Tienda Perseo: ${product?.name || ''} | Minimal UI`}</title>
      </Head>
      <MainLayout>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          {product && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={7}>
                <ProductDetailsCarousel product={product} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <ProductDetailsSummary
                  product={product}
                  cart={cart}
                  onAddCart={handleAddCart}
                  onGotoStep={() => {}}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                />
              </Grid>
            </Grid>
          )}
          <Descripcion product={product} />
        </Container>
      </MainLayout>
    </>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name } = ctx.query as { name: string };
  const productoName = name?.replace(/-/g, ' ');

  const req = await tiendaApi.get(`/products/${productoName}`);
  const images = JSON.parse(req.data.images);
  const product = { ...req.data, images }; 
  
  
  return {
    props: {
      product,
    },
  };
};
