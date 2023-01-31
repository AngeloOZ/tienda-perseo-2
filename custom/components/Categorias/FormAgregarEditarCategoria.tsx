import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography } from '@mui/material';

// components
import { useSnackbar } from '../../../src/components/snackbar';
import FormProvider, {
    RHFUpload,
    RHFTextField,
} from '../../../src/components/hook-form';


import { ICategoria } from '../../../interfaces';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Categoria } from '@prisma/client';
import { useCategories } from '.';


type FormValuesProps = ICategoria;

type Props = {
    isEdit?: boolean;
    currentCategory?: Categoria;
}

export function FormAgregarEditarCategoria({ isEdit = false, currentCategory }: Props) {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { agregarCategoria, editarCategoria } = useCategories();


    useEffect(() => {
        if (isEdit && currentCategory) {
            reset(defaultValues);
            setValue('id', currentCategory.id);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentCategory]);

    const newCategorySchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre de la categoria es requerido'),
        icono: Yup.mixed().required('El icono de la categoria requerida'),
    });

    const defaultValues = useMemo<ICategoria>(() => ({
        nombre: currentCategory?.nombre || '',
        icono: currentCategory?.icono || null,
    }), [currentCategory]);

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(newCategorySchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();

    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (isEdit) {
                await editarCategoria(data);
                enqueueSnackbar('Categoria actualizada correctamente', { variant: 'success' });
                push(PATH_DASHBOARD.categorias.root);
                return;
            }

            await agregarCategoria(data);
            enqueueSnackbar('Categoria agregada correctamente', { variant: 'success' });
            push(PATH_DASHBOARD.categorias.root);
            reset();
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar("No se pudo la categoria: " + error.message, { variant: 'error' });
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('icono', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const handleRemoveFile = () => {
        setValue('icono', null);
    };

    const renderButtons = () => {
        return <>
            <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={() => push(PATH_DASHBOARD.productos.root)}
            >
                Cancelar
            </Button>

            <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
            >
                Guardar
            </LoadingButton>
        </>
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Typography variant='subtitle1' component='h1'>{isEdit ? "Editar" : "Agregar"} categoria</Typography>

                            <RHFTextField name="nombre" label="Descripción" />

                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Icono
                                </Typography>

                                <RHFUpload
                                    name="icono"
                                    maxSize={1048576}
                                    onDrop={handleDrop}
                                    onDelete={handleRemoveFile}
                                    onRemove={handleRemoveFile}
                                />
                            </Stack>

                        </Stack>

                        <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                            {renderButtons()}
                        </Stack>
                    </Card>
                </Grid>

            </Grid>
        </FormProvider>
    );
}
