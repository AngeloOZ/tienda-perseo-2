import { useContext } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';

// components
import { AuthContext } from 'src/auth';
import { CustomAvatar } from '../../../components/custom-avatar';

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

  console.log(user);
  

  return (
    <Link underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src={'http://atrilco.com/wp-content/uploads/2017/11/ef3-placeholder-image.jpg'} alt={user?.nombre} name={user?.nombre} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.nombre}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.rol}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
