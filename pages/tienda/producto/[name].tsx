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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const product: IProduct = {
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
  };

  return {
    props: {
      product,
    },
  };
};
