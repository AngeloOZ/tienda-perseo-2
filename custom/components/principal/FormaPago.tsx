import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import CategoriaCart from './CategoriaCart';
import { ICategoria } from 'src/@types/product';
import { AlignHorizontalCenter } from '@mui/icons-material';
import FormasPagoCart from './FormasPagoCart';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function  FormaPago () {
  return (
    <>
    <Box sx={{ width: '100%', margin:'auto', marginLeft: {
          xs:'10%',
          sm:'10%',
          md:'5%',
          lg:'10%'
         },
         marginRight:{
          xs:'10%',
          sm:'10%',
          md:'5%',
          lg:'5%'
         } }}
         
         >


       <FormasPagoCart/> 
   </Box>
      
    </>
  );
};
