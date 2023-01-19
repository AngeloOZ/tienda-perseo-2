import { useEffect, useState } from 'react';
import { Drawer, Box } from '@mui/material';
import { CartProvider } from 'src/context';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import MainLayout from 'src/layouts/main/MainLayout';
import { CustomCart } from 'src/components/Custom/e-commerce';

import { ShopProductCard } from 'src/sections/shop';
import { ICheckoutCartItem } from 'src/@types/product';

const Home = () => {
  const arrproducto: ICheckoutCartItem[] = [
    {
        id: "1",
        name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        cover: "https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg",
        available: 5,
        price: 109.95,
        colors: ["Rojo"],
        size: "M",
        quantity: 1,
        subtotal: 100.00
    },

    {
        id: "",
        name: "Mens Casual Premium Slim Fit T-Shirts",
        cover: "https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg",
        available: 8,
        price: 22.3,
        colors: ["Rojo", "Cafe"],
        size: "S",
        quantity: 1,
        subtotal: 20.00
    },
];


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

        <Box
                gap={3}
                display="grid"
                padding={2}
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
            >
                {arrproducto.map((producto: ICheckoutCartItem) => (
                    <ShopProductCard key={producto.id} product={producto} />
                ))}            
            </Box>

      </CartProvider>
    </MainLayout>
  );
};

export default Home;
