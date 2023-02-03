// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, BoxProps, Badge } from '@mui/material';

import Iconify from 'src/components/iconify';

// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
// components
import Logo from '../../components/logo';
// import Label from '../../components/label';

interface Props {
  totalItems: number;
  onShowCart: VoidFunction;
  showButtonsCart?: boolean;
}

export default function Header({ showButtonsCart = true, totalItems, onShowCart }: Props) {
  const theme = useTheme();

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  // -------------------- CART -------------------------

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
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
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}
      >
        <Logo />

        {showButtonsCart && (
          <Button variant="contained" style={{ margin: 10 }} size="large" onClick={onShowCart}>
            <Badge showZero badgeContent={totalItems} color="error" max={99}>
              Carrito
              <Iconify icon="eva:shopping-cart-fill" width={25} />
            </Badge>
          </Button>
        )}
      </Toolbar>
      {isOffset && <Shadow />}
    </AppBar>
  );
}

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
