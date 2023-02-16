import { useContext, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Container, Grid } from '@mui/material';
import Cookies from 'js-cookie';

import { DatosFactura, ListadoProductos, ResumenCompra } from 'custom/components';
import { useSnackbar } from 'src/components/snackbar';

import MainLayout from 'src/layouts/main/MainLayout';
import { FormFactura } from 'interfaces';
import { tiendaApi } from 'custom/api';
import { CartContext } from 'context';
import { jsonBase64 } from 'utils';
import { DEFAULT_VENDEDOR, PATH_PAGE_TIENDA } from 'src/routes/paths';

// eslint-disable-next-line
const PageTienda = ({ factura }: { factura: any }) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { handleResetCart, cart, discount, subtotal, shipping, iva, total } = useContext(CartContext);

    const { query: { vendedor } } = useRouter() as any;
    const [idVendedor] = useState<string>(vendedor || DEFAULT_VENDEDOR.toString());

    const onSubmit = async (data: FormFactura) => {
        try {
            const cart = Cookies.get('CART');
            const cartJson = JSON.parse(cart!);
            await tiendaApi.post('/ventas', { ...data, cart: cartJson });

            enqueueSnackbar('Tu compra ha sido registrada con exito', { variant: 'success' });
            handleResetCart();
            router.push(`/${idVendedor}${PATH_PAGE_TIENDA.tienda.root}`);
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Ha ocurrido un error al registrar tu compra', { variant: 'error' });
        }
    }

    return (
        <MainLayout showCart={false}>
            <Head>
                <title>Finalizar compra</title>
            </Head>
            <Container maxWidth={false} component="main" sx={{ mt: 2 }}>
                <Grid container gap={1} display="flex" justifyContent="space-evenly">
                    <Grid item xs={12} md={7} lg={7} xl={6}>
                        <ListadoProductos cart={cart} />
                        <div id="ButtonPaybox" />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={5}>
                        <ResumenCompra iva={iva} subtotal={subtotal} total={total} discount={discount} shipping={shipping} />
                        <DatosFactura onSubmitEvent={onSubmit} isFinished disabled mt={1.5} />
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    );
};

export default PageTienda;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    let factura = req.cookies.datosFactura;
    if (factura) {
        factura = jsonBase64.paseJSON(factura);
    }
    return {
        props: {
            factura,
        }
    }
}
