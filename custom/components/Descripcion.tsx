import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { IProduct } from 'src/@types/product';


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
    <Grid container justifyContent="center" margin={7} alignItems="center">
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </Grid>
  );
};
