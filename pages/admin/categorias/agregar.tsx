import Head from 'next/head'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'

import { FormAgregarEditarCategoria } from 'custom/components'



PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout roles={['admin','editor']}>{page}</DashboardLayout>

export default function PageAdmin() {

    return (
        <>
            <Head>
                <title>Agregar nueva categoria</title>
            </Head>
            <FormAgregarEditarCategoria />
        </>
    )
}