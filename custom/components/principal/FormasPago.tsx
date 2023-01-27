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
    <Grid container spacing={2}
     columns={2}
      sx={{ flexGrow: 1, p: 2, 
        width: {
          xs:200,
          sm:700,
          md:700,
          lg:700
        }, 
        paddingTop: 3, 
        margin: 'auto' }}
    >
      <Grid
        container
        spacing={1}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)'
        }}
    
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            width: {
              xs:200,
              sm:700,
              md:700,
              lg:700
            }, 
            height: {
              xs:150,
              sm:80,
              md:80,
              lg:80
            }, 
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
    </Grid>
  );
}
