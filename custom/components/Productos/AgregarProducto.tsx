import * as Yup from 'yup';
import { useState, useCallback } from 'react';
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


type FormValuesProps = IProducto;

export function AgregarProducto() {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { categories } = useObtenerCategorias();
    const { agregarProducto } = useProducto();

    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('El titulo es requerido'),
        description: Yup.string().required('La descripcion es requerida'),
        stock: Yup.number().required('El stock es requerido').min(1, 'El stock debe ser mayor a 0').positive('El stock no puede ser negativo'),
        price: Yup.number().required('El precio es requerido').min(1, 'El precio debe ser mayor a 0').positive('El precio no puede ser negativo'),
        category: Yup.string().required('La categoria es requerida'),
        images_list: Yup.array().min(1, 'Debe tener al menos 1 imagen').required('Las imagenes son requeridas'),
        cover: Yup.mixed().required('La foto principal es requerida'),
        rating: Yup.string().required('La categoria es requerida'),
    });

    const defaultValues = {
        name: '',
        description: '',
        stock: 0,
        price: 0,
        category: '',
        images_list: [],
        cover: null,
        status: true,
        rating: '5',
    };

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
            await agregarProducto(data);
            enqueueSnackbar('Producto agregado correctamente', { variant: 'success' });
        } catch (error) {
            console.error(error.message);
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

    const handleDrop2 = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            const files = values.images_list;
            setValue('images_list', [...files, ...newFiles], { shouldValidate: true });
        },
        [values.images_list, setValue]
    );

    const handleRemoveAllFiles = () => {
        setValue('images_list', []);
    };

    const handleRemoveSpecificFile = (inputFile: File | string) => {
        const filtered = values.images_list.filter((file: File | string) => file !== inputFile);
        setValue('images_list', filtered);
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>

                        <Stack spacing={3}>
                            <RHFSwitch
                                name="status"
                                label={values.status ? 'Producto disponible' : 'Producto no disponible'}
                                labelPlacement="start"
                                sx={{ mb: 1, mx: 0, width: 1, }}
                            />

                            <RHFTextField name="name" label="Titulo" />

                            <RHFTextField name="price" label="Precio" type='number' />

                            <RHFSelect name='category' placeholder='Categoria' label='Categoria'>
                                <MenuItem value="" disabled>Seleccione una categoria</MenuItem>
                                {categories.map((category) => <MenuItem value={category.id}>{category.nombre}</MenuItem>)}
                            </RHFSelect>

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

                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Descripcion
                                </Typography>
                                <RHFEditor simple style={{ height: 400 }} placeholder='Detalle del producto' name="description" />
                            </Stack>

                            <Stack>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                    Imagenes
                                </Typography>
                                <RHFUpload
                                    name="images_list"
                                    thumbnail
                                    multiple
                                    maxSize={3145728}
                                    onDrop={handleDrop2}
                                    onRemove={handleRemoveSpecificFile}
                                />
                                {!!values.images_list.length && (
                                    <Button variant="outlined" color="error" onClick={handleRemoveAllFiles}>
                                        Remover todos los archivos
                                    </Button>
                                )}
                            </Stack>

                        </Stack>

                        <Stack direction="row" spacing={1.5} sx={{ mt: 5 }}>
                            <Button
                                fullWidth
                                color="inherit"
                                variant="outlined"
                                size="large"
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
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
