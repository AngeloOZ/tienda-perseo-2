import { useState } from 'react';
// @mui
import { Card, Stack, Button, Divider, MenuItem, Checkbox, IconButton, CardContent, CardMedia, Typography, CardHeader } from '@mui/material';

// @prisma
import { Producto } from '@prisma/client';

// components
import Iconify from '../../../src/components/iconify';
import MenuPopover from '../../../src/components/menu-popover';
import ConfirmDialog from '../../../src/components/confirm-dialog';

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
          p: 2.5,
          // width: 1,
          // maxWidth: 222,
          bgcolor: 'background.default',
        }}
      >
        <CardHeader>
          <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>

        </CardHeader>
        <CardMedia
          component="img"
          height="194"
          image={product.cover}
          alt={product.name}
        />
        <CardContent>
          <Typography>{product.name}</Typography>
        </CardContent>
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
