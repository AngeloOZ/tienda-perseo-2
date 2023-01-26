import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import { Divider, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Stack, height } from '@mui/system';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function FormasPago() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{ flexGrow: 1, p: 2, width: 700, fontSize: 50, paddingTop: 3, margin: 'auto' }}
    //  display="grid"
    >
      <Grid
        container
        spacing={1}
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            width: 700,
            height:80
            // paddingTop: 2
          },
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label={<Typography variant="subtitle1">Paga cómodo y seguro</Typography>}
            icon={<PaidIcon />}
          />
          <Divider orientation="vertical" variant="middle" flexItem />

          <BottomNavigationAction
            label={<Typography variant="subtitle1">Hasta 12 cuotas</Typography>}
            icon={<CreditCardIcon />}
          />
          <Divider orientation="vertical" variant="middle" flexItem />

          <BottomNavigationAction
            label={<Typography variant="subtitle1">Tarjeta de débito</Typography>}
            icon={<CreditCardIcon />}
          />
          <Divider orientation="vertical" variant="middle" flexItem />

          <BottomNavigationAction
            label={<Typography variant="subtitle1">Más medios de pago</Typography>}
            icon={<AddCircleOutlineIcon />}
          />
        </BottomNavigation>
      </Grid>
    </Box>
  );
}
