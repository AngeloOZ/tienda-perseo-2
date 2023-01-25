import { useContext } from 'react';

// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Stack, Fab, Typography } from '@mui/material';
// routes

// components
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Image from '../../components/image';
// import { price } from 'src/_mock/assets';
// import { ColorPreview } from '../../components/color-utils';
// import { fCurrency } from '../../utils/formatNumber';
import { useRouter } from 'next/router';

import { CartContext } from 'src/context';
import { IProduct, ICheckoutCartItem } from 'src/@types/product';
import { fCurrency } from 'src/utils/formatNumber';

// --------------------------------------s--------------------------------

type Props = {
  product: IProduct;
};

export default function ShopProductCard({ product }: Props) {
  
  const { id, name, cover, price, available } = product;
  
  //Product used only for the cart.
  const productForCart: ICheckoutCartItem = {
    id, name, cover, available, price, 
    quantity: 1,
    subtotal: 0
  }
  
  const router = useRouter();

  const linkTo = `tienda/producto/${name}`;
  const status = '';

  const ctx = useContext(CartContext);
  const { handleAddCart } = ctx;

  const onAddCart = () => {
    handleAddCart(productForCart);
  };

  const redirectToProducto = () => {
    router.push(linkTo);
  };

  return (
    <Card
      sx={{
        padding: 0,
        margin: 0,
        ' .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}

        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={onAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab>
        <Image
          alt={'Imagen'}
          src={cover}
          ratio="1/1"
          sx={{ borderRadius: 1.5 }}
          onClick={redirectToProducto}
        />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link component={NextLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
          {name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {true && (
              <Box component="span" sx={{ color: 'inherit' }}>
                {fCurrency(price) + " "}
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  + IVA
                </Typography>
              </Box>
            )}

            {/* <Box component="span">{15.2}</Box> */}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
