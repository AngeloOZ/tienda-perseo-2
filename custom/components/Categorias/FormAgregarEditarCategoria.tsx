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


import { IProducto } from '../../../interfaces';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Producto } from '@prisma/client';


type FormValuesProps = IProducto;
type Props = {
    isEdit?: boolean;
    currentProduct?: Producto;
}

export function FormAgregarEditarCategoria({ isEdit = false, currentProduct }: Props) {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    // const { agregarProducto, editarProducto } = useProducto();

    useEffect(() => {
        if (isEdit && currentProduct) {
            console.log(currentProduct);
            reset(defaultValues);
            setValue('id', currentProduct.id);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentProduct]);

    const newCategorySchema = Yup.object().shape({
        name: Yup.string().required('El titulo es requerido'),
        cover: Yup.mixed().required('La foto principal es requerida'),
    });

    const defaultValues = useMemo<IProducto>(() => ({
        name: currentProduct?.name || '',
        description: currentProduct?.description || '',
        stock: currentProduct?.stock || 0,
        price: currentProduct?.price || 0,
        category: currentProduct?.categoriaID?.toString() || '',
        images: JSON.parse(currentProduct?.images || '[]') || [],
        cover: currentProduct?.cover || null,
        status: currentProduct?.status || true,
        rating: currentProduct?.rating?.toString() || '5',
    }), [currentProduct]);

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
                // await editarProducto(data);
                // enqueueSnackbar('Producto actualizado correctamente', { variant: 'success' });
                // push(PATH_DASHBOARD.productos.root);
                // return;
            }
            // await agregarProducto(data);
            // enqueueSnackbar('Producto agregado correctamente', { variant: 'success' });
            // push(PATH_DASHBOARD.productos.root);
            // reset();
        } catch (error) {
            // console.error(error.message);
            enqueueSnackbar("No se pudo ingresar el producto: " + error.message, { variant: 'error' });
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('cover', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const handleRemoveFile = () => {
        setValue('cover', null);
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

                            <RHFTextField name="name" label="Descripción" />

                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Icono
                                </Typography>
                                
                                <RHFUpload
                                    name="cover"
                                    maxSize={1048576}
                                    onDrop={handleDrop}
                                    onDelete={handleRemoveFile}
                                    onRemove={handleRemoveFile}
                                />
                            </Stack>

                        </Stack>

                        <Stack direction="row" spacing={1.5} sx={{ mt: 2, display: { xs: "none", md: "flex" } }}>
                            {renderButtons()}
                        </Stack>
                    </Card>
                </Grid>

            </Grid>
        </FormProvider>
    );
}
