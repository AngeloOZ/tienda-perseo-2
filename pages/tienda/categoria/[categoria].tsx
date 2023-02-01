import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { IProduct } from 'src/@types/product';
import { ShopProducts } from 'custom/components/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormaPago from 'custom/components/principal/FormaPago';
import { Categoria } from 'custom/components/principal/Categoria';
import { Grid } from '@mui/material';
import { obtenerProductosLocal } from 'pages/api/products';
import { obtenerCategorias } from 'pages/api/categories';
import Head from 'next/head';
import { Categoria as CategoriaID } from '@prisma/client';


interface Props {
    categories: CategoriaID[];
    products: IProduct[];
}

// eslint-disable-next-line
const PageCategoria: NextPage<Props> = ({ products, categories }) => {

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


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const categories = await obtenerCategorias();

    return {
        paths: categories.map((cat) => ({ params: { categoria: cat.ruta } })),
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const categories = await obtenerCategorias();
    const { categoria } = params as { categoria: string };
    const currentCategory = categories.find((cat) => cat.ruta === categoria);
    const products = await obtenerProductosLocal(currentCategory!.id);

    return {
        props: {
            products,
            categories
        },
    };
}

export default PageCategoria;
