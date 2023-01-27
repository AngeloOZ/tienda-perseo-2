import * as Yup from 'yup';
import { useState, useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography, MenuItem } from '@mui/material';

// components
import { useSnackbar } from '../../../src/components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFEditor,
    RHFUpload,
    RHFTextField,
    RHFSelect,
} from '../../../src/components/hook-form';

import { useObtenerCategorias, useProducto } from '.';
import { IProducto } from '../../../interfaces';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { LinearProgressBar } from '../LinearProgressBar';
import { Producto } from '@prisma/client';


type FormValuesProps = IProducto;
type Props = {
    isEdit?: boolean;
    currentProduct?: Producto;
}

export function FormAgregarEditarProducto({ isEdit = false, currentProduct }: Props) {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, categories } = useObtenerCategorias();
    const { agregarProducto, editarProducto } = useProducto();

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

    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('El titulo es requerido'),
        description: Yup.string().required('La descripcion es requerida'),
        stock: Yup.number().required('El stock es requerido').min(1, 'El stock debe ser mayor a 0').positive('El stock no puede ser negativo'),
        price: Yup.number().required('El precio es requerido').min(1, 'El precio debe ser mayor a 0').positive('El precio no puede ser negativo'),
        category: Yup.string().required('La categoria es requerida'),
        images: Yup.array().min(1, 'Debe tener al menos 1 imagen').required('Las imagenes son requeridas'),
        cover: Yup.mixed().required('La foto principal es requerida'),
        rating: Yup.string().required('La categoria es requerida'),
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
        resolver: yupResolver(NewProductSchema),
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
                await editarProducto(data);
                enqueueSnackbar('Producto actualizado correctamente', { variant: 'success' });
                push(PATH_DASHBOARD.productos.root);
                return;
            }
            await agregarProducto(data);
            enqueueSnackbar('Producto agregado correctamente', { variant: 'success' });
            push(PATH_DASHBOARD.productos.root);
        } catch (error) {
            console.error(error.message);
            enqueueSnackbar("No se pudo ingresar el producto: " + error.message, { variant: 'error' });
        } finally {
            reset();
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

    const handleDrop2 = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            const files = values.images;
            setValue('images', [...files, ...newFiles], { shouldValidate: true });
        },
        [values.images, setValue]
    );

    const handleRemoveAllFiles = () => {
        setValue('images', []);
    };

    const handleRemoveSpecificFile = (inputFile: File | string) => {
        const filtered = values.images.filter((file: File | string) => file !== inputFile);
        setValue('images', filtered);
    }

    if (isLoading) return <LinearProgressBar />

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
                <Grid item xs={12} md={6} lg={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <Typography variant='subtitle1' component='h1'>{isEdit ? "Editar" : "Agregar"} producto</Typography>

                            <RHFSwitch
                                name="status"
                                label={values.status ? 'Producto disponible' : 'Producto no disponible'}
                                labelPlacement="start"
                                sx={{ mb: 1, mx: 0, width: 1, }}
                            />

                            <RHFTextField name="name" label="Titulo" />

                            <RHFSelect name='category' placeholder='Categoria' label='Categoria'>
                                <MenuItem value="" disabled>Seleccione una categoria</MenuItem>
                                {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.nombre}</MenuItem>)}
                            </RHFSelect>

                            <RHFTextField name="price" label="Precio" type='number' />

                            <RHFTextField name="stock" label="Stock" type='number' />

                            <RHFSelect name='rating' placeholder='Calificación' label='Calificación'>
                                <MenuItem value="5">5 puntos</MenuItem>
                                <MenuItem value="4">4 puntos</MenuItem>
                                <MenuItem value="3">3 puntos</MenuItem>
                                <MenuItem value="2">2 puntos</MenuItem>
                                <MenuItem value="1">1 punto</MenuItem>
                            </RHFSelect>

                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Descripcion
                                </Typography>
                                <RHFEditor simple style={{ height: 400 }} placeholder='Detalle del producto' name="description" />
                            </Stack>

                        </Stack>

                        <Stack direction="row" spacing={1.5} sx={{ mt: 2, display: { xs: "none", md: "flex" } }}>
                            {renderButtons()}
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={{ xs: 2, md: 1 }}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Imagen principal
                                </Typography>
                                <RHFUpload
                                    name="cover"
                                    maxSize={3145728}
                                    onDrop={handleDrop}
                                    onDelete={handleRemoveFile}
                                    onRemove={handleRemoveFile}
                                />
                            </Stack>

                            <Stack>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Imagenes
                                </Typography>
                                <RHFUpload
                                    name="images"
                                    thumbnail
                                    multiple
                                    maxSize={3145728}
                                    onDrop={handleDrop2}
                                    onRemove={handleRemoveSpecificFile}
                                />
                                {!!values.images.length && (
                                    <Button variant="outlined" color="error" onClick={handleRemoveAllFiles}>
                                        Remover todos los archivos
                                    </Button>
                                )}
                            </Stack>

                            <Stack direction="row" spacing={1.5} sx={{ mt: 2, display: { xs: "flex", md: "none" } }}>
                                {renderButtons()}
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
