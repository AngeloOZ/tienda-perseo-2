import { useEffect, useState } from 'react';

// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Stack, Fab } from '@mui/material';
// routes


// components
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Image from '../../components/image';
import { price } from 'src/_mock/assets';
// import { ColorPreview } from '../../components/color-utils';
// import { fCurrency } from '../../utils/formatNumber';

import { useRouter } from 'next/router';


// --------------------------------------s--------------------------------

interface Productos{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: any;  
}

type Props = {
  product: Productos;
};

export default function ShopProductCard({ product }: Props) {
  // const { id, name, cover, price, colors, status, available, sizes, priceSale } = product;

  //const linkTo = (`/tienda/${product.title}`);
  const linkTo = "#";
  const status = "sale";

  const handleAddCart = async () => {
    // const newProduct = {
    //   id,
    //   name,
    //   cover,
    //   available,
    //   price,
    //   colors: [colors[0]],
    //   size: sizes[0],
    //   quantity: 1,
    // };
    try {

    } catch (error) {
      console.error(error);
    }
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
          onClick={handleAddCart}
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

          <Image alt={""} src={product.image} ratio="1/1" sx={{ borderRadius: 1.5 }} />
         </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link component={NextLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
          {product.title}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {true && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {product.price}
              </Box>
            )}

            <Box component="span">{15.20}</Box>

          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
