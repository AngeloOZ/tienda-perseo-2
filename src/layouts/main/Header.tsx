// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link, BoxProps, Badge } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
// import { PATH_DOCS, PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// components
import Logo from '../../components/logo';
import Label from '../../components/label';
//
// import NavMobile from './nav/mobile';
// import navConfig from './nav/config-navigation';
// import NavDesktop from './nav/desktop';

//-------------------- CART -------------------------
// import CartWidget from 'src/sections/@dashboard/e-commerce/CartWidget';
import Iconify from 'src/components/iconify';
import { StyledRoot } from '../login/styles';

// ----------------------------------------------------------------------
interface Props {
  totalItems: number;
  //handleShowCart: React.MouseEventHandler<HTMLButtonElement>;  
  handleShowCart: VoidFunction;  
}

export default function Header({ totalItems ,handleShowCart }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  //-------------------- CART -------------------------

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />
          <Link
            // href={PATH_DOCS.changelog}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{ ml: 1 }}
          >
{/*             <Label color="info"> v4.1.0 </Label>
 */}          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />} */}

          {/* <Button variant="contained" target="_blank" rel="noopener" href={PATH_MINIMAL_ON_STORE}>
            Purchase Now
          </Button> */}

          {/* -------------------- CART ------------------------- */}
          {/* <CartWidget totalItems={checkout.totalItems} /> */}
                              
          <Button variant="contained" style={{ margin: 10 }} size='large' 
          onClick={handleShowCart}>            
            <Badge showZero badgeContent={totalItems} color="error" max={99}>            
              Carrito
              <Iconify icon="eva:shopping-cart-fill" width={25} />
            </Badge>
          </Button>

          {/* {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />} */}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
