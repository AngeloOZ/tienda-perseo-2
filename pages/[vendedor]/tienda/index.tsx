import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';

import { IProduct } from 'src/@types/product';
import { ShopProducts } from 'custom/components/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormaPago from 'custom/components/principal/FormaPago';

import { obtenerProductosLocal } from 'pages/api/products';
import { obtenerCategorias } from 'pages/api/categories';
import { categoria as CategoriaID } from '@prisma/client';
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

      <FormaPago />

      <Categoria categoria={categories} />

      <ShopProducts products={products} />
    </MainLayout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await obtenerProductosLocal();
  const categories = await obtenerCategorias();

  return {
    props: {
      products,
      categories,
    },
  };
}

export default PageTienda;
