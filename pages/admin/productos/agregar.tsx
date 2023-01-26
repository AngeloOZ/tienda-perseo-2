import { Container } from '@mui/material'
import Head from 'next/head'


import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { AgregarProducto } from 'custom/components'



PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdmin() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title>Agregar nuevo producto</title>
            </Head>
            <AgregarProducto />
        </>
    )
} 1