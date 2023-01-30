import React from 'react'
import PaymenDelivery from 'src/components/e-commerce/checkout/paymenDelivery'
import { Grid } from '@mui/material'
import { ICheckoutDeliveryOption, ICheckoutCardOption, ICheckoutPaymentOption } from 'src/@types/product';

import MainLayout from 'src/layouts/main/MainLayout';
import { LoadingButton } from '@mui/lab';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { PaymenCard } from 'src/components/e-commerce/checkout/paymenCard';
import FormProvider from 'src/components/hook-form/FormProvider';

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
    {
        value: 0,
        title: 'Envio estandar (free)',
        description: 'Entregado el Domingo, 12 de febrero',
    },
    {
        value: 2,
        title: 'Envio rapido ($2,00)',
        description: 'Entregado el Domingo, 5 de febrero',
    },
];

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
    {
        value: 'Paypal',
        title: 'Pagar con Paypal',
        description: 'Será redirigido al sitio web de PayPal para completar su compra de forma segura.',
        icons: ['/assets/icons/payments/ic_paypal.svg'],
    },
    {
        value: 'credit_card',
        title: 'Tarjeta de credito / Debito',
        description: 'Admitimos Mastercard, Visa, Discover y Stripe.',
        icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
    },
    {
        value: 'Efectivo',
        title: 'Pagar en efectivo',
        description: 'Pague en efectivo cuando le entreguen su pedido.',
        icons: [],
    },
];

const CARDS_OPTIONS: ICheckoutCardOption[] = [
    { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
    { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
    { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

type Props = {
    // checkout: IProductCheckoutState;
    onNextStep: VoidFunction;
    // onBackStep: VoidFunction;
    onReset: VoidFunction;
    // onGotoStep: (step: number) => void;
    onApplyShipping: (value: number) => void;
};
type FormValuesProps = {
    delivery: number;
    payment: string;
};

function Index({
    onReset,
    onNextStep,
    onApplyShipping,
}: Props) {

    const PaymentSchema = Yup.object().shape({
        payment: Yup.string().required('!Se requiere metodo de pago!'),
    });

    const defaultValues = {    
        payment: '',
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(PaymentSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async () => {
        try {
            onNextStep();
            onReset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <MainLayout />
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} pt={5} justifyContent="center">
                    <Grid item xs={8}>

                        <PaymenDelivery
                            onApplyShipping={onApplyShipping}
                            deliveryOptionss={DELIVERY_OPTIONS}
                        />
                        <PaymenCard
                            cardOptions={CARDS_OPTIONS}
                            paymentOptions={PAYMENT_OPTIONS}
                            sx={{ my: 3 }}
                        />
                        <LoadingButton
                            sx={{ mb: 5 }}
                            size="large"
                            type="submit"
                            variant="contained"                            
                            loading={isSubmitting}                        
                        >
                            Check Out
                        </LoadingButton>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    )
}
export default Index    