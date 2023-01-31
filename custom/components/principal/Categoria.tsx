import { FC } from 'react';
import { Grid } from '@mui/material';
import CategoriaCart from './CategoriaCart';
import { Categoria as CategoriaI } from '@prisma/client';

interface Props {
  categoria: CategoriaI[];
}



export const Categoria: FC<Props> = ({ categoria }) => {
  return (
    <>
      <Grid
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(4, 1fr)',
          md: 'repeat(7, 1fr)',
          lg: 'repeat(7, 1fr)',
        }}
         sx={{
         marginLeft: {
          xs:'50%',
          sm:'50%',
          md:'50%',
          lg:'50%'
         },
         marginRight:{
          xs:'50%',
          sm:'50%',
          md:'50%',
          lg:'50%'
         }
       }}
       paddingTop={4}
      >
        {categoria?.map((cate: CategoriaI) => (
          <CategoriaCart key={cate.id} categoria={cate} />
        ))}
      </Grid>
    </>
  );
};
