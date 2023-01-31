import { useState } from 'react';
// @mui
import { Card, Stack, Button, MenuItem, IconButton, CardContent, CardMedia, Typography } from '@mui/material';

// @prisma
import { Categoria } from '@prisma/client';

// components
import { useSnackbar } from '../../../src/components/snackbar';
import Iconify from '../../../src/components/iconify';
import MenuPopover from '../../../src/components/menu-popover';
import ConfirmDialog from '../../../src/components/confirm-dialog';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useCategories } from '.';

type Props = {
  category: Categoria;
}

export const CategoryItem = ({ category }: Props) => {
  const { eliminarCategoria } = useCategories();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();


  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClickEdit = () => {
    router.push(`${PATH_DASHBOARD.categorias.editar}/${category.id}`);
  }

  const handleClickDelete = async () => {
    try {
      handleCloseConfirm();
      await eliminarCategoria(category.id);
      enqueueSnackbar('Producto Eliminado', { variant: 'success' });
    } catch (error) {
      console.log(error);
      
      enqueueSnackbar('Error al eliminar el producto', { variant: 'error' });
    }
  }

  return (
    <>
      <Card
        sx={{
          bgcolor: 'background.default',
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
          <IconButton sx={{ backgroundColor: "rgba(0,0,0,0.25)" }} color='default' onClick={handleOpenPopover}>
            <Iconify color="#fff" icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>

        <CardMedia
          component="img"
          height="150"
          image={category.icono}
          alt={category.nombre}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography component="p" mt={1} ml={2} variant='subtitle1'>{category.nombre}</Typography>
        </CardContent>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          sx={{ color: 'secondary.main' }}
          onClick={() => {
            handleClosePopover();
            handleClickEdit();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Eliminar
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Eliminar categoria"
        content="¿Estas seguro de eliminar la categoria? Esta acción borrará los productos asociados a esta categoria"
        action={
          <Button variant="contained" color="error" onClick={handleClickDelete}>
            Eliminar
          </Button>
        }
      />
    </>
  );
};
