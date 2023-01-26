import { useState } from 'react';
// @mui
import { Card, Stack, Button, MenuItem, IconButton, CardContent, CardMedia, Typography, CardActions } from '@mui/material';

// @prisma
import { Producto } from '@prisma/client';

// components
import Iconify from '../../../src/components/iconify';
import MenuPopover from '../../../src/components/menu-popover';
import ConfirmDialog from '../../../src/components/confirm-dialog';
import { Delete } from '@mui/icons-material';

type Props = {
  product: Producto;
}

export const ProductoItem = ({ product }: Props) => {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);


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

  return (
    <>
      <Card
        sx={{
          bgcolor: 'background.default',
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
          <IconButton sx={{ backgroundColor: "rgba(0,0,0,0.25)" }} color='default' onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>

        <CardMedia
          component="img"
          height="200"
          image={product.cover}
          alt={product.name}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography component="p" mt={1} ml={2} variant='subtitle1'>{product.name}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: 'flex-end' }}>
          <Button size='small' variant="outlined" color='error' startIcon={<Delete />}>
            Eliminar
          </Button>
          <Button size='small' variant="contained" color='secondary' startIcon={<Delete />}>
            Editar
          </Button>
        </CardActions>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem sx={{ color: 'secondary.main' }}>
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
        title="Eliminar producto"
        content="¿Estas seguro de eliminar este producto?"
        action={
          <Button variant="contained" color="error" onClick={() => { }}>
            Eliminar
          </Button>
        }
      />
    </>
  );
};
