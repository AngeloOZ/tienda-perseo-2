import { useContext } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Container, Grid } from '@mui/material';
import Cookies from 'js-cookie';
// import { useSnackbar } from 'notistack';
import { DatosFactura, ListadoProductos, ResumenCompra } from 'custom/components';
import { useSnackbar } from 'src/components/snackbar';

import MainLayout from 'src/layouts/main/MainLayout';
import { FormFactura } from 'interfaces';
import { tiendaApi } from 'custom/api';
import { CartContext } from 'context';

// eslint-disable-next-line
const PageTienda: NextPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const { handleResetCart } = useContext(CartContext);


    const onSubmit = async (data: FormFactura) => {
        try {
            const cart = Cookies.get('CART');
            const cartJson = JSON.parse(cart!);
            await tiendaApi.post('/ventas', { ...data, cart: cartJson });

            enqueueSnackbar('Tu compra ha sido registrada con exito', { variant: 'success' });
            handleResetCart();
            router.push(`/tienda`);
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Ha ocurrido un error al registrar tu compra', { variant: 'error' });
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
                        <DatosFactura onSubmitEvent={onSubmit} isFinished disabled mt={1.5} />
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    );
};

export default PageTienda;
