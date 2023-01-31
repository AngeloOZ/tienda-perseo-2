import { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import { ICategoria, IProduct } from 'src/@types/product';
import { ShopProducts } from 'src/components/e-commerce/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormaPago from 'custom/components/principal/FormaPago';
import { Categoria } from 'custom/components/principal/Categoria';
import { Grid } from '@mui/material';

interface Props {
  products: IProduct[];
}

interface Props{
  categoria: ICategoria[];
} 

const index: NextPage<Props> = ({ products, categoria }) => {

 /* 
  */

  return (
    <MainLayout>
      <ImagenPricipal />
       <Grid container justifyContent="center" p={2}>
        <FormaPago />      
           <Categoria categoria={categoria} />
       </Grid>
      <ShopProducts products={products} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get('http://localhost:8084/api/products/');  
  //const rescate = await axios.get('http://localhost:8084/api/categoria/');  

  return {
    props: {
      products: res.data,
     // categoria: rescate.data
    },
  };
};



export default index;
