import Head from 'next/head'

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { EditarDatoVentas, LinearProgressBar, ListadoProductos, ResumenCompra } from 'custom/components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { tiendaApi } from 'custom/api'
import { VentaPorID } from 'interfaces'
import { Box, Grid } from '@mui/material'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs'
import { PATH_DASHBOARD } from 'src/routes/paths'

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

    if (isLoading) return <LinearProgressBar />

    return (
        <>
            <Head>
                <title>Editar venta</title>
            </Head>
            <CustomBreadcrumbs
                heading={`Editar venta #${currentValue?.id_venta!}`}
                links={[
                    { name: 'Lista de ventas', href: PATH_DASHBOARD.ventas.root },
                    { name: currentValue?.identificacion! },
                ]}
            />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <ListadoProductos cart={currentValue?.productos!} />
                    <Box sx={{ width: { xs: "100%" }, marginTop: { xs: 2, md: 2 } }} width="100%" >
                        <ResumenCompra
                            sx={{ width: '100%' }}
                            subtotal={currentValue?.subtotal!}
                            iva={currentValue?.totalIVA!}
                            total={currentValue?.total!}
                            title=''
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EditarDatoVentas
                        initDdataEdit={{
                            id: currentValue?.id_venta!,
                            correo: currentValue?.correo!,
                            nombre: currentValue?.nombres!,
                            ruc: currentValue?.identificacion!,
                            whatsapp: currentValue?.whatsapp!,
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}