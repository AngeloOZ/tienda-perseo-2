// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// @mui
import { Box, Divider } from '@mui/material';
//

import Header from './Header';
// import Footer from './Footer';
// const Header = dynamic(() => import('./Header'), { ssr: false });
// const Footer = dynamic(() => import('./Footer'), { ssr: false });

import { useContext } from 'react';
import { CartContext } from 'src/context';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
  handleShowCart: VoidFunction;
};

export default function MainLayout({ children, handleShowCart }: Props) {
  const { pathname } = useRouter();
  const isHome = pathname === '/';

  const ctx = useContext(CartContext);
  const { totalItems } = ctx;

  return (
  <Box sx={{ 
    display: 'flex' , flexDirection: 'column', height: 1 , position: 'fixed'
    
    }}>      
      <Header totalItems={totalItems} handleShowCart={handleShowCart} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        <Divider sx={{ color:'inherit'}}/>
        {children}
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}
