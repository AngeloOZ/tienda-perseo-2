import { useContext } from 'react';

// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Stack, Fab, Typography } from '@mui/material';
// routes

// import { price } from 'src/_mock/assets';
// import { ColorPreview } from '../../components/color-utils';
// import { fCurrency } from '../../utils/formatNumber';
import { useRouter } from 'next/router';

import { CartContext } from 'context';
import { IProduct, ICheckoutCartItem } from 'src/@types/product';
import { fCurrency } from 'src/utils/formatNumber';

// components
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Image from '../../components/image';

// --------------------------------------s--------------------------------

type Props = {
  vendedor: string;
  product: IProduct;
};

export default function ShopProductCard({ vendedor, product }: Props) {
  const { id, name, cover, price, stock, status } = product;

  // Product used only for the cart.
  const productForCart: ICheckoutCartItem = {
    id,
    name,
    cover,
    stock,
    price,
    quantity: stock < 1 ? 0 : 1,
    subtotal: 0,
  };

  const router = useRouter();

  const linkTo = `/${vendedor}/tienda/producto/${product.slug}`;

  const ctx = useContext(CartContext);
  const { cart, handleAddCart } = ctx;

  // Disable the "Agregar Al Carrito" buttom
  const isMaxQuantity =
    cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= stock;

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
        '.add-cart-btn': {
          opacity: 1,

        },
      }}

    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {
          (!status || stock == 0) && (<Label
            variant="filled"
            color='error'
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Agotado
          </Label>)
        }


        {
          status && stock > 0 && (
            <Fab
              disabled={isMaxQuantity}
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
          )
        }

        <Image
          alt='Imagen'
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

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {true && (
              <Box component="span" sx={{ color: 'inherit' }}>
                {fCurrency(price)}
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  + IVA
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
