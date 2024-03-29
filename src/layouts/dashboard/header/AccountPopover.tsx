import { useContext, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem } from '@mui/material';

import { AuthContext } from 'src/auth';

// routes
import { PATH_AUTH } from '../../../routes/paths';
// auth
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { push } = useRouter();

  const { user, logoutUser } = useContext(AuthContext);

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logoutUser();
      push(PATH_AUTH.login);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logoutUser!', { variant: 'error' });
    }
  };

  // const handleClickItem = (path: string) => {
  //   handleClosePopover();
  //   push(path);
  // };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src='https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png' alt={user?.nombres} name={user?.nombres} />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.nombres}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.correo}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Cerrar Sesión
        </MenuItem>
      </MenuPopover>
    </>
  );
}
