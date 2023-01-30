import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import CategoriaCart from './CategoriaCart';
import { ICategoria } from 'src/@types/product';
import { AlignHorizontalCenter } from '@mui/icons-material';
import FormasPagoCart from './FormasPagoCart';


export const FormasPago = () => {
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
      >

       <FormasPagoCart/>
      </Grid>
    </>
  );
};
