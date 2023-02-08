import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';

import Cookies from 'js-cookie';
import { Container, Grid } from '@mui/material';

import { DatosFactura, ListadoProductos, ResumenCompra } from 'custom/components';
import MainLayout from 'src/layouts/main/MainLayout';
import { jsonBase64 } from 'utils';
import { FormFactura } from 'interfaces';


// eslint-disable-next-line
const PageTienda: NextPage = () => {
    const router = useRouter();
    const onSubmit = async (data: FormFactura) => {
        try {
            jsonBase64.stringifyJSON(data);
            Cookies.set('datosFactura', jsonBase64.stringifyJSON(data));
            router.push('/tienda/resumen/finalizar');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <MainLayout showCart={false}>
            <Head>
                <title>Resumen de la tienda</title>
            </Head>
            <Container maxWidth={false} component="main" sx={{ mt: 2 }}>
                <Grid container gap={1} display="flex" justifyContent="space-evenly">
                    <Grid item xs={12} md={7} lg={7} xl={6}>
                        <ListadoProductos />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={5}>
                        <ResumenCompra />
                        <DatosFactura onSubmitEvent={onSubmit} mt={1.5} />
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    );
};

export default PageTienda;
