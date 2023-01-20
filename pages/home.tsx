import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { CartProvider } from 'src/context';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { ICheckoutCartItem } from 'src/@types/product';
import MainLayout from 'src/layouts/main/MainLayout';
import { Cart } from 'src/components/e-commerce/cart';
import { ShopProducts } from 'src/components/e-commerce/shop';

interface Props {
  products: ICheckoutCartItem[];
}

const Home: NextPage<Props> = ({ products }) => {
  const [stateViewCart, setStateViewCart] = useState(false);
  const handleShowCart = () => {
    setStateViewCart(!stateViewCart);    
  };
  useEffect(() => {}, [stateViewCart]);

  return (
    <CartProvider>
      <MainLayout handleShowCart={handleShowCart}>
        <Drawer
          anchor="right"
          open={stateViewCart}
          onClose={handleShowCart}
          PaperProps={{ sx: { width: '85%' } }}
        >
          <Cart onShowCart={handleShowCart}/>
        </Drawer>
        <ShopProducts products={products} />
      </MainLayout>
    </CartProvider>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products: ICheckoutCartItem[] = [
    {
      id: '1',
      name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      cover:
        'https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg',
      available: 5,
      price: 109.95,
      colors: [],
      size: '',
      quantity: 1,
      subtotal: 100.0,
    },

    {
      id: '2',
      name: 'Sneakers',
      cover:
        'https://paylessec.vtexassets.com/arquivos/ids/351896-800-800?v=637914449574030000&width=800&height=800&aspect=true',
      available: 8,
      price: 22.3,
      colors: [],
      size: '',
      quantity: 1,
      subtotal: 20.0,
    },
  ];

  return {
    props: {
      products,
    },
  };
};

export default Home;
