// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Drawer } from '@mui/material';
//

import Header from './Header';
// import Footer from './Footer';
// const Header = dynamic(() => import('./Header'), { ssr: false });
// const Footer = dynamic(() => import('./Footer'), { ssr: false });

import { useContext, useState } from 'react';
import { CartContext } from 'src/context';

import { Cart } from 'src/components/e-commerce/cart';


// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { pathname } = useRouter();
  const isHome = pathname === '/';

  const [stateViewCart, setStateViewCart] = useState(false);
  const handleShowCart = () => {
    setStateViewCart(!stateViewCart);
  };

  const ctx = useContext(CartContext);
  const { totalItems } = ctx;

  return (
    <Box
    /* sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        position: 'fixed',
      }} */
    >
      <Header totalItems={totalItems} onShowCart={handleShowCart} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        <Divider sx={{ color: 'inherit' }} />
 
        <Drawer
          anchor="right"
          open={stateViewCart}
          onClose={handleShowCart}
          PaperProps={{
            sx: {
              width: {
                xs: '100%',
                md: '100%',
                xl: '75%',
                lg: '75%',
              },
            },
          }}
        >
          <Cart onShowCart={handleShowCart} />
        </Drawer>

        {children}
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}
