import { useContext } from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
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
import Script from 'next/script';
import { jsonBase64 } from 'utils';

// eslint-disable-next-line
const PageTienda: NextPage = ({ factura }) => {
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
                <title>Finalizar compra</title>
            </Head>
            <Container maxWidth={false} component="main" sx={{ mt: 2 }}>
                <Grid container gap={1} display="flex" justifyContent="space-evenly">
                    <Grid item xs={12} md={7} lg={7} xl={6}>
                        <ListadoProductos />
                        <div id="ButtonPaybox"></div>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} xl={5}>
                        <ResumenCompra />
                        <DatosFactura onSubmitEvent={onSubmit} isFinished disabled mt={1.5} />
                    </Grid>
                </Grid>
            </Container>
            <Script src=" https://code.jquery.com/jquery-3.4.1.min.js" strategy='beforeInteractive'></Script>
            <Script src="https://sandbox-paybox.pagoplux.com/paybox/index.js" strategy='beforeInteractive'></Script>
            <Script strategy='beforeInteractive' >
                {`
                    var data = {
                        PayboxRemail: "jaime@pegasus.ec",
                        PayboxSendmail: "angello.ordonez@hotmail.com",
                        PayboxRename: "Jaime Sarabia",
                        PayboxSendname: "ANGELLO ORDOÑEZ",
                        PayboxBase0: 0,
                        PayboxBase12: 10,
                        PayboxDescription: "Pago tienda socio-perseo",
                        PayboxProduction: false,
                        PayboxEnvironment: "sandbox",
                        PayboxLanguage: "es",
                        PayboxRequired: [],
                        PayboxDirection: "av nidal 2-45 y av. 10 de agosto",
                        PayBoxClientPhone: "0987654321",
                        PayBoxClientName: "ANGELLO ORDOÑEZ",
                        PayBoxClientIdentification: "2300368665",
                        PayboxPagoPlux: false,
                        PayboxIdElement: 'idHtmlPay'
                    };
        
                    var onAuthorize = function(response) {
                        if (response.status == 'succeeded') {
                            console.log(response);

                        }else{
                            console.error("Error...!!");
                        }
                    };
                `}
            </Script>
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
