import { useContext } from 'react';
// next
import Head from 'next/head';
// @mui
import { Grid, Container } from '@mui/material';
// @types
// layouts
// import DashboardLayout from '../../../../layouts/dashboard';
// components
import Iconify from '../../../src/components/iconify';
import { useSettingsContext } from '../../../src/components/settings';
// import { SkeletonProductDetails } from '../../../../components/skeleton';
// sections
import { ProductDetailsSummary, ProductDetailsCarousel } from '../../../src/sections/details';
import CartWidget from '../../../src/sections/CartWidget';
import { CartContext } from 'src/context';
import { IProduct } from 'src/@types/product';
import MainLayout from 'src/layouts/main/MainLayout';
// ----------------------------------------------------------------------

interface Props {
  product: IProduct;
}

export default function EcommerceProductDetailsPage() {
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
          {/* <CartWidget totalItems={totalItems} /> */}

          {product && (
            <>
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
            </>
          )}
        </Container>
      </MainLayout>
    </>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name } = ctx.query;
  const productoName = name?.replace(/-/g, ' ');

  const req = await axios.get(`http://localhost:8084/api/products/${productoName}`);
  const images = JSON.parse(req.data.images).images;
  const product = { ...req.data, images };  

  return {
    props: {
      product,
    },
  };
};
