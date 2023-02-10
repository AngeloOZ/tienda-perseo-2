import Head from 'next/head'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { DatosFactura, FormAgregarEditarProducto, LinearProgressBar, ListadoProductos, ResumenCompra } from 'custom/components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { tiendaApi } from 'custom/api'
import { VentaPorID } from 'interfaces'
import { Box, Grid } from '@mui/material'

PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdmin() {
    const { query } = useRouter();
    const [currentValue, setCurrentValue] = useState<VentaPorID>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (query.id) {
            obtenerVenta();
        }
        // eslint-disable-next-line
    }, [query])

    const obtenerVenta = async () => {
        try {
            setIsLoading(true);
            const { data } = await tiendaApi.get(`/ventas?id=${query.id}`);
            setCurrentValue(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }

    }

    const onSubmitEvent = async (data: any) => {
        console.log(data);
    }

    if (isLoading) return <LinearProgressBar />

    return (
        <>
            <Head>
                <title>Editar venta</title>
            </Head>
            <Grid container>
                <Grid item xs={12} md={7} xl={8} >
                    <ListadoProductos cart={currentValue?.productos!} />
                </Grid>
                <Grid item xs={12} md={5} xl={4} display="flex" justifyContent="flex-end">
                    <Box sx={{ width: { xs: "100%" }, marginLeft: { xs: 0, md: 4 } }} width="100%" >
                        <ResumenCompra
                            sx={{ width: '100%' }}
                            subtotal={currentValue?.subtotal!}
                            iva={currentValue?.totalIVA!}
                            total={currentValue?.total!}
                            title=''
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} mt={2}>
                    <DatosFactura
                        editFormData={{
                            nombre: currentValue?.nombres!,
                            ruc: currentValue?.identificacion!,
                            whatsapp: currentValue?.whatsapp!,
                            correo: currentValue?.correo!,
                            id: currentValue?.id_venta!,
                        }}
                        hiddenButton
                        onSubmitEvent={onSubmitEvent}
                    />
                </Grid>
            </Grid>
        </>
    )
}