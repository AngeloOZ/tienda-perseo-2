import Head from 'next/head'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { producto, ventas } from '@prisma/client'
import { Container } from '@mui/material'
import { TableCustom } from 'custom/components'
import { useEffect, useState } from 'react'
import { tiendaApi } from 'custom/api'


PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout roles={['vendedor']}>{page}</DashboardLayout>

export default function PageAdmin() {
    const [isLoading, setIsLoading] = useState(true)
    const [datosTabla, setDatosTabla] = useState<ventas[]>([]);
    useEffect(() => {
        obtenerVentas()
    }, [])

    const obtenerVentas = async () => {
        setIsLoading(true);
        const { data } = await tiendaApi.get('/ventas')
        setDatosTabla(data)
        setIsLoading(false);
    }

    const eliminarVenta = async (item : ventas) => {
        console.log(item)
    }

    const editarVenta = async (item: ventas) => {
        console.log(item)
    }

    return (
        <>
            <Head>
                <title>Listado de ventas</title>
            </Head>
            <Container maxWidth={false}>
                <TableCustom 
                    headers={[
                        { label: "ID", name: "id_venta", type: 'number', serchable: false },
                        { label: 'Identificacion', name: 'identificacion' },
                        { label: 'Nombres', name: 'nombres', },
                        { label: 'WhatsApp', name: 'whatsapp' },
                        { label: 'Fecha', name: 'fecha_creado', type: 'date', serchable: false },
                    ]}
                    dataBody={datosTabla} 
                    exportOptions={true}
                    isActions={true}
                    handeEdit={editarVenta}
                    handleDelete={eliminarVenta}
                    isLoading={isLoading}
                />
            </Container>
        </>
    )
}


