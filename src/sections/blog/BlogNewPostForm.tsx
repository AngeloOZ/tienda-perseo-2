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
import { useSnackbar } from '../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFSelect,
} from '../../components/hook-form';
//
// import BlogNewPostPreview from './BlogNewPostPreview';

interface IProduct {
  name: string;
  price: number;
  available: boolean;
  category: string;
  photo: string | File | null;
  description: string;
  images_list: [] | File[];
};

export type FormValuesProps = IProduct;

export default function BlogNewPostForm() {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  // const [openPreview, setOpenPreview] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required('El titulo es requerido'),
    price: Yup.number().required('El precio es requerido').min(1,'El precio debe ser mayor a 0').positive('El precio no puede ser negativo'),
    category: Yup.string().required('La categoria es requerida'),
    photo: Yup.mixed().required('La foto principal es requerida'),
    description: Yup.string().required('La descripcion es requerida'),
    images_list: Yup.array().min(1, 'Debe tener al menos 1 imagen').required('Las imagenes son requeridas'),
  });

  const defaultValues = {
    name: '',
    price: 0,
    available: true,
    category: '',
    photo: null,
    description: '',
    images_list: [],
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
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

  // const handleOpenPreview = () => {
  //   setOpenPreview(true);
  // };

  // const handleClosePreview = () => {
  //   setOpenPreview(false);
  // };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // handleClosePreview();
      enqueueSnackbar('Post success!');
      // push("#productos");
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photo', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('photo', null);
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
                name="available"
                label="Disponibilidad del producto"
                labelPlacement="start"
                sx={{ mb: 1, mx: 0, width: 1, }}
              />

              <RHFTextField name="name" label="Titulo" size='small' />
              <RHFTextField name="price" label="Precio" type='number' />

              <RHFSelect name='category' placeholder='Categoria' label='Categoria'>
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="1">Hola 1</MenuItem>
                <MenuItem value="2">Hola 2</MenuItem>
              </RHFSelect>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Imagen principal
                </Typography>
                <RHFUpload
                  name="photo"
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
                <RHFEditor simple placeholder='Detalle del producto' name="description" />
              </Stack>

              <Stack>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Imagenes
                </Typography>
                <RHFUpload
                  name="images_list"
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
              {/* <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOpenPreview}
              >
                Vista previa
              </Button> */}

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

      {/* <BlogNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> */}
    </FormProvider>
  );
}
