import { FC } from "react"
import { Box, BoxProps, Card, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material"

import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useForm } from "react-hook-form";

interface Props extends BoxProps {
    disabled?: boolean;
    other?: BoxProps;
}

export const DatosFactura: FC<Props> = ({ disabled = false, other }) => {
    const methods = useForm({
        // resolver: yupResolver(newCategorySchema),
        // defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();

    const onSubmit = async (data) => {

    }

    return (
        <Box {...other} mt={1.5}>
            <Card>
                <CardHeader title="Datos de Facturación" />
                <CardContent>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <RHFTextField size="small" disabled={disabled} name="nombre" label="Nombres" />
                                    <RHFTextField size="small" disabled={disabled} name="nombre" label="Identificación" />
                                    <RHFTextField size="small" disabled={disabled} name="nombre" label="WhatsApp" />
                                    <RHFTextField size="small" disabled={disabled} name="nombre" label="Correo electrónico" />
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </CardContent>
            </Card>
        </Box>
    )
}
