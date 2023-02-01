import { FC } from 'react';
import { Box } from '@mui/material';
import { ShopProductCard } from 'src/sections/shop';
import { IProduct } from 'src/@types/product';

interface Props {
  products: IProduct[];
}
// eslint-disable-next-line arrow-body-style
export const ShopProducts: FC<Props> = ({ products }) => {  
  return (    
      <Box
        gap={3}
        display="grid"
        padding={10}
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {products?.map((product: IProduct) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </Box>    
  );
};
