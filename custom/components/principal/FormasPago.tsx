import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


export default function FormasPago() {
  const [value, setValue] = React.useState(0);

  return (
   /*  <Box 
    //sx={{ width: 700, paddingTop: 3, margin: 'auto', borderColor: 'divider' }}
    sx={{
      width: 700, paddingTop: 3, margin: 'auto',
      '--Grid-borderWidth': '1px',
      borderTop: 'var(--Grid-borderWidth) solid',
      borderLeft: 'var(--Grid-borderWidth) solid',
     // borderColor: 'divider',
      //'& > div': {
       borderRight: 'var(--Grid-borderWidth) solid',
         borderBottom: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider',
      }}
    
    > */

    <Box sx={{ flexGrow: 1, p: 2, width: 700, paddingTop: 3, margin: 'auto'}}>
      <Grid
        container
        spacing={2}
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
           // paddingTop: 2
          },
        }}
      >

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Paga cómodo y seguro" icon={<PaidIcon />} />
        <Divider orientation="vertical" variant="middle" flexItem/>
        <BottomNavigationAction label="Hasta 12 cuotas" icon={<CreditCardIcon />} />
        <Divider orientation="vertical" variant="middle" flexItem/>
        <BottomNavigationAction label="Tarjeta de débito" icon={<CreditCardIcon />} />
        <Divider orientation="vertical" variant="middle" flexItem/>
        <BottomNavigationAction label="Más medios de pago" icon={<AddCircleOutlineIcon />} />
      </BottomNavigation>
      </Grid>

    </Box>
  );
}
