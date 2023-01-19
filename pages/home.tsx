import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { CartProvider } from 'src/context';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import MainLayout from 'src/layouts/main/MainLayout';
import { CustomCart } from 'src/components/Custom/e-commerce';

const Home = () => {
  const [stateViewCart, setStateViewCart] = useState(false);
  const handleShowCart = () => {
    setStateViewCart(!stateViewCart);
  };
  useEffect(() => {}, [stateViewCart]);

  return (
    <MainLayout handleShowCart={handleShowCart}>
      <CartProvider>
        <Drawer
          anchor="right"
          open={stateViewCart}
          onClose={handleShowCart}
          PaperProps={{ sx: { width: '85%' } }}
        >
          <CustomCart />
        </Drawer>
      </CartProvider>
    </MainLayout>
  );
};

export default Home;
