import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import CategoriaCart from './CategoriaCart';
import { categoria as CategoriaI } from '@prisma/client';

interface Props {
  categoria: CategoriaI[];
}



export const Categoria: FC<Props> = ({ categoria }) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent='center'
      flexWrap="wrap"
      marginTop={3}
    >
      {categoria?.map((cate: CategoriaI) => (
        <CategoriaCart
          key={cate.id}
          categoria={cate}
        />
      ))}
    </Box>
  );
};
