import Head from 'next/head'

import { Container } from '@mui/material'

import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { FormAgregarEditarProducto, LinearProgressBar } from 'custom/components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { tiendaApi } from 'custom/api'
import { Producto } from '@prisma/client'




PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdmin() {
    const { themeStretch } = useSettingsContext();
    const { query } = useRouter();
    const [currentValue, setCurrentValue] = useState<Producto>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (query.id) {
            obtenerProducto();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const obtenerProducto = async () => {
        try {
            const { data } = await tiendaApi.get(`/products?id=${query.id}`);
            setCurrentValue(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }

    }

    if (isLoading) return <LinearProgressBar />


    return (
        <>
            <Head>
                <title>Agregar nuevo producto</title>
            </Head>
            <FormAgregarEditarProducto isEdit currentProduct={currentValue} />
        </>
    )
}