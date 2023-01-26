import Head from 'next/head'
import { GetServerSideProps } from 'next'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { ProductList } from 'custom/components'
import { obtenerProductosLocal } from 'pages/api/products'
import { Producto } from '@prisma/client'

type Props = {
    products: Producto[]
}

PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdmin({ products }: Props) {

    return (
        <>
            <Head>
                <title>Listado de productos</title>
            </Head>
            <ProductList products={products} />
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