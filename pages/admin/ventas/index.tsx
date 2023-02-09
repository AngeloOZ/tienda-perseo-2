import Head from 'next/head'
import { GetServerSideProps } from 'next'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { ProductList, useObtenerProductos } from 'custom/components'
import { obtenerProductosLocal } from 'pages/api/products'
import { producto, ventas } from '@prisma/client'
import { Container } from '@mui/material'
import { TablaVentas } from 'custom/components'
import { useEffect, useState } from 'react'
import { tiendaApi } from 'custom/api'

type Props = {
    products: producto[]
}

PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout roles={['vendedor']}>{page}</DashboardLayout>

export default function PageAdmin() {

    const [datosTabla, setDatosTabla] = useState<ventas[]>([]);
    useEffect(() => {
        obtenerVentas()
    }, [])

    const obtenerVentas = async () => {
        const { data } = await tiendaApi.get('/ventas')
        setDatosTabla(data)
    }

    return (
        <>
            <Head>
                <title>Listado de ventas</title>
            </Head>
            <Container maxWidth={false}>
                <TablaVentas 
                    headers={[
                        { label: "ID", name: "id_venta", type: 'number', serchable: false },
                        { label: 'Identificacion', name: 'identificacion' },
                        { label: 'Nombres', name: 'nombres', },
                        { label: 'WhatsApp', name: 'whatsapp' },
                        { label: 'Fecha', name: 'fecha_creado', type: 'date', serchable: false },
                    ]}
                    dataBody={datosTabla} 
                    isActions
                    
                />
            </Container>
        </>
    )
}


