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

export default function EcommerceProductDetailsPage({ product }: Props) {
  const { themeStretch } = useSettingsContext();

  const ctx = useContext(CartContext);
  const { totalItems, cart, handleAddCart } = ctx;

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const product: IProduct = {
    id: '1',
    name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    cover:
      'https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg',
    available: 5,
    price: 109.95,
    // colors: [],
    description: '',
    images: [
      'https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg',
      'https://paylessec.vtexassets.com/arquivos/ids/351896-800-800?v=637914449574030000&width=800&height=800&aspect=true',
    ],
    inventoryType: 'ropa',
    status: '',
    totalRating: 0,
    totalReview: 0,
  };

  return {
    props: {
      product,
    },
  };
};
