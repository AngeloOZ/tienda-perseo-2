import { Container, Grid } from '@mui/material';
import { DatosFactura, ListadoProductos, ResumenCompra } from 'custom/components';
import { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from 'src/layouts/main/MainLayout';


// eslint-disable-next-line
const PageTienda: NextPage = () => {

    return (
        <MainLayout>
            <Head>
                <title>Resumen de la tienda</title>
            </Head>
            <Container maxWidth={false}  component="main" sx={{ mt: 3 }}>
                <Grid container gap={2} display="flex" justifyContent="space-evenly">
                    <Grid item xs={12} md={7} lg={7} xl={6}>
                        <ListadoProductos />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={5}>
                        <ResumenCompra />
                        <DatosFactura  />
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    );
};

export default PageTienda;
