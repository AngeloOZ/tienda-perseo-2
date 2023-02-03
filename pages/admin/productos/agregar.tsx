import Head from 'next/head'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { FormAgregarEditarProducto } from 'custom/components'



PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout >{page}</DashboardLayout>

export default function PageAdmin() {

    return (
        <>
            <Head>
                <title>Agregar nuevo producto</title>
            </Head>
            <FormAgregarEditarProducto />
        </>
    )
}