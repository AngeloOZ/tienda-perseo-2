import { useContext } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';

// components
import { AuthContext } from 'src/auth';
import { CustomAvatar } from '../../../components/custom-avatar';
import { upperFirst } from 'lodash';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useContext(AuthContext);

  return (
    <Link underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src='https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png' alt={user?.nombres} name={user?.nombres} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.nombres}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {upperFirst(user?.rol[0]) || ''}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
