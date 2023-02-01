import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import Head from 'next/head';
import { Grid, Container } from '@mui/material';

import { CartContext } from 'context';
import { IProduct } from 'src/@types/product';
import MainLayout from 'src/layouts/main/MainLayout';
import { Descripcion } from 'custom/components/Descripcion';

import { obtenerProductoSlug } from 'pages/api/products/[name]';
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
      {console.log(product)}
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name } = ctx.query as { name: string };

  const producto = await obtenerProductoSlug(name);
  const images = JSON.parse(producto?.images!);

  const product = { ...producto, images }; 

  return {
    props: {
      product,
    },
  };
};
