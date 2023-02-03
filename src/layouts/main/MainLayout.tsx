// next
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Drawer } from '@mui/material';
//
// import Footer from './Footer';
import { useContext, useState } from 'react';
import { CartContext } from 'context';
import { Cart } from 'custom/components/cart';
import Header from './Header';



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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        fillOpacity: 10
      }}
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
                xl: '85%',
                lg: '85%',
              },
            },
          }}
        >
          <Cart onShowCart={handleShowCart} />
        </Drawer>

        {children}
      </Box>
    </Box>
  );
}
