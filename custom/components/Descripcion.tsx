import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';
import { IProduct } from 'src/@types/product';


interface Props extends BoxProps {
  product: IProduct;
  other?: BoxProps
}

export const Descripcion: FC<Props> = ({ product, other }) => {
  return (
    <Box
      component="div"
      mb={5}
      sx={{ overflow: 'hidden' }}
      {...other}
      dangerouslySetInnerHTML={{ __html: product.description }}
    />
  );
};
