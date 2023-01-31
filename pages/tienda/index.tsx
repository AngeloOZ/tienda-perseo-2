import { NextPage, GetServerSideProps } from 'next';
import { ICategoria, IProduct } from 'src/@types/product';
import { ShopProducts } from 'src/components/e-commerce/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormaPago from 'custom/components/principal/FormaPago';
import { Categoria } from 'custom/components/principal/Categoria';
import { Grid } from '@mui/material';
import { obtenerProductosLocal } from 'pages/api/products';
import { obtenerCategorias } from 'pages/api/categories';

interface Props {
  products: IProduct[];
}

interface Props{
  categories: ICategoria[];
} 

const index: NextPage<Props> = ({ products, categories }) => {

  return (
    <MainLayout>
      <ImagenPricipal />
       <Grid container justifyContent="center" p={2}>
        <FormaPago />      
           <Categoria categoria={categories} />
       </Grid>
      <ShopProducts products={products} />
    </MainLayout>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products = await obtenerProductosLocal();
  const categories = await obtenerCategorias();
  return {
    props: {
      products,
      categories
    },
  };
};



export default index;
