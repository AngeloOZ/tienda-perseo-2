import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Icon from 'src/components/color-utils/Icon';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Image from 'src/components/image/Image';
import { ICategoria } from 'src/@types/product';
import { border, margin } from '@mui/system';
import Link from '@mui/material/Link';

interface Props{
  categoria: ICategoria;
}

export default function CategoriaCart({categoria}:Props) {
  return (

    <Card sx={{ width:170, height:170, boxShadow: 5, marginX: 1, marginY:0.7}}>
       <Link href="#" underline="none">
       <CardActionArea sx={{width:170, height:170, }} >          
              <Image
                alt={'icono'}
                src={categoria.icono}
                sx={{
                  width:50,
                  height:50,
                  margin: 'auto'
                  
                }}
              />
              <Typography variant="subtitle1" paddingTop={3} align='center' color='green'> {categoria.nombre}</Typography>
       </CardActionArea>
     </Link>

    </Card>    
  );
}
