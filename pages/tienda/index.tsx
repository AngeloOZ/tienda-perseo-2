import { NextPage, GetServerSideProps } from 'next';
import { IProduct } from 'src/@types/product';
import Head from 'next/head';
import { ShopProducts } from 'custom/components/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormaPago from 'custom/components/principal/FormaPago';
import { Grid } from '@mui/material';
import { obtenerProductosLocal } from 'pages/api/products';
import { obtenerCategorias } from 'pages/api/categories';
import { Categoria as CategoriaID } from '@prisma/client';
import { Categoria } from 'custom/components/principal/Categoria';


interface Props {
  products: IProduct[];
}

interface Props {
  categories: CategoriaID[];
}

// eslint-disable-next-line
const PageTienda: NextPage<Props> = ({ products, categories }) => {

  return (
    <MainLayout>
      <Head>
        <title>Listado de productos</title>
      </Head>
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



export default PageTienda;
