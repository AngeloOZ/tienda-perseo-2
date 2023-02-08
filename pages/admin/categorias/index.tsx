import Head from 'next/head'
import { GetServerSideProps } from 'next'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { categoria } from '@prisma/client'
import { obtenerCategorias } from 'pages/api/categories'
import { CategoryList, useObtenerCategories } from 'custom/components'
import { Container } from '@mui/material'

type Props = {
    categories: categoria[]
}

PageAdminCategorias.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdminCategorias({ categories: data }: Props) {

    const { categories } = useObtenerCategories(data);

    return (
        <>
            <Head>
                <title>Listado de categorias</title>
            </Head>
            <Container maxWidth={false}>
                <CategoryList categories={categories} />
            </Container>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const data = await obtenerCategorias();

    return {
        props: {
            categories: data
        }
    }
}