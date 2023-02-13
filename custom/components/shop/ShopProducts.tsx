import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ShopProductCard } from 'src/sections/shop';
import { IProduct } from 'src/@types/product';
import { useRouter } from 'next/router';
import { DEFAULT_VENDEDOR } from 'src/routes/paths';

interface Props {
  products: IProduct[];
}
// eslint-disable-next-line arrow-body-style
export const ShopProducts: FC<Props> = ({ products }) => {
  const { query: { vendedor } } = useRouter() as any;
  const [idVendedor, setIdVendedor] = useState<string>(vendedor || DEFAULT_VENDEDOR.toString());

  return (
    <Box
      gap={3}
      display="grid"
      padding={{ xs: 1, sm: 8 }}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
    >
      {products?.map((product: IProduct) => (
        <ShopProductCard key={product.id} vendedor={idVendedor} product={product} />
      ))}
    </Box>
  );
};
