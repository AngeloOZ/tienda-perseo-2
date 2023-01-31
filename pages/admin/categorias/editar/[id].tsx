import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'

import { FormAgregarEditarCategoria, LinearProgressBar } from 'custom/components'
import { tiendaApi } from 'custom/api'
import { Categoria } from '@prisma/client'




PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdmin() {
    const { query } = useRouter();
    const [currentValue, setCurrentValue] = useState<Categoria>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (query.id) {
            obtenerProducto();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const obtenerProducto = async () => {
        try {
            const { data } = await tiendaApi.get(`/categories?id=${query.id}`);
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
                <title>Editar categoria</title>
            </Head>
            <FormAgregarEditarCategoria isEdit currentCategory={currentValue} />
        </>
    )
}