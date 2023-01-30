import React, { FC } from 'react';
import { IProduct } from 'src/@types/product';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
  product: IProduct;
}

export const Descripcion: FC<Props> = ({ product }) => {
  return (
  /*   <Card>
        <CardContent>
    <div dangerouslySetInnerHTML={{__html: product.description}}/>                       
    </CardContent>
    </Card> */

    <div dangerouslySetInnerHTML={{__html: product.description}}/>                       

  );
};
