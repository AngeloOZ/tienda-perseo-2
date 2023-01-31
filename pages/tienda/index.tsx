import { NextPage, GetServerSideProps } from 'next';
import { tiendaApi } from 'custom/api';
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

const getProducts = async () => {
  const res = await tiendaApi.get(`/products`);  
  return res.data;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products = await getProducts();
  return {
    props: {
      products
    },
  };
};



export default index;
