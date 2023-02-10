import { FC, useEffect, useMemo, useState } from "react"
import Link from "next/link";

import * as Yup from 'yup';
import { Box, BoxProps, Button, Card, CardContent, CardHeader, Grid, Stack } from "@mui/material"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

import FormProvider, { RHFTextField } from "src/components/hook-form";
import { jsonBase64 } from "utils";
import Cookies from "js-cookie";
import { FormFactura } from "interfaces";
import { PATH_PAGE_TIENDA } from "src/routes/paths";

type FormValuesProps = FormFactura
interface Props extends BoxProps {
    editFormData?: FormValuesProps;
    disabled?: boolean;
    isFinished?: boolean;
    hiddenButton?: boolean;
    onSubmitEvent: (data: FormValuesProps) => void;
}

export const DatosFactura: FC<Props> = ({ hiddenButton, isFinished, disabled = false, editFormData, onSubmitEvent, ...other }) => {
    const [defaultValuesCookie, setDefaultValuesCookie] = useState<FormValuesProps>()

    useEffect(() => {
        const datosCookie = Cookies.get('datosFactura');
        if (datosCookie) {
            const datos = jsonBase64.paseJSON(datosCookie) as FormValuesProps;
            setDefaultValuesCookie(datos);
        } else if (editFormData) {
            setDefaultValuesCookie(editFormData);
        }
    }, []);

    useEffect(() => {
        if (defaultValuesCookie) {
            reset(defaultValuesCookie);
        }
    }, [defaultValuesCookie])

    const newCategorySchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es necesario para la factura').trim(),
        ruc: Yup.string().required('La identificación es necesaria para la factura').matches(/^[0-9]+$/, 'La identificación solo puede contener números').min(10, 'La identificación debe tener al menos 10 dígitos').max(13, 'La identificación no puede tener más de 13 dígitos').trim(),
        whatsapp: Yup.string().required('El número de WhatsApp es necesario').matches(/^[0-9+]+$/, 'El número de WhatsApp solo puede contener números').max(13, 'El número de WhatsApp no puede tener más de 13 números').trim(),
        correo: Yup.string().required('El correo electrónico es necesario para la factura').email('El correo electrónico no es válido').trim(),
    });

    const defaultValues = useMemo<FormValuesProps>(() => ({

        nombre: defaultValuesCookie?.nombre || '',
        ruc: defaultValuesCookie?.ruc || '',
        whatsapp: defaultValuesCookie?.whatsapp || '',
        correo: defaultValuesCookie?.correo || '',
    }), [defaultValuesCookie]);

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(newCategorySchema),
        defaultValues,
    });

    const {
        watch,
        setValue,
        reset,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();

    return (
        <Box {...other}>
            <Card>
                <CardHeader title="Datos de Facturación" />
                <CardContent>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitEvent)}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Stack spacing={1.2}>
                                    <RHFTextField sx={{ fontSize: 10 }} size="small" disabled={disabled} name="nombre" label="Nombres" />
                                    <RHFTextField size="small" type="number" disabled={disabled} name="ruc" label="Identificación" />
                                    <RHFTextField size="small" type="tel" disabled={disabled} name="whatsapp" label="WhatsApp" />
                                    <RHFTextField size="small" type="email" disabled={disabled} name="correo" label="Correo electrónico" />
                                    {
                                        !hiddenButton &&
                                        <Stack direction="row" spacing={2} >
                                            {
                                                isFinished ?
                                                    <Link href={PATH_PAGE_TIENDA.tienda.resumen} legacyBehavior>
                                                        <Button fullWidth variant="outlined" color="error">Regresar</Button>
                                                    </Link>
                                                    :
                                                    <Link href={PATH_PAGE_TIENDA.tienda.root} legacyBehavior>
                                                        <Button fullWidth variant="outlined" color="error">Regresar</Button>
                                                    </Link>
                                            }
                                            <LoadingButton
                                                fullWidth
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                loading={isSubmitting}
                                            >
                                                Siguiente
                                            </LoadingButton>
                                        </Stack>
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </CardContent>
            </Card>
        </Box>
    )
}
