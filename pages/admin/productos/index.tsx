import Head from 'next/head'
import { GetServerSideProps } from 'next'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { ProductList, useObtenerProductos } from 'custom/components'
import { obtenerProductosLocal } from 'pages/api/products'
import { Producto } from '@prisma/client'
import { Container } from '@mui/material'

type Props = {
    products: Producto[]
}

PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdmin({ products: data }: Props) {

    const { products } = useObtenerProductos(data);

    return (
        <>
            <Head>
                <title>Listado de productos</title>
            </Head>
            <Container maxWidth={false}>
                <ProductList products={products} />
            </Container>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const data = await obtenerProductosLocal();

    return {
        props: {
            products: data
        }
    }
}