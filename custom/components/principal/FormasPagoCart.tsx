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

export default function FormasPagoCart() {
  const [value, setValue] = React.useState(0);

  return (
    <Grid>
      <Card sx={{ width:300, height:120}}>
       <CardActionArea sx={{width:300, height:120 }}>         
          <PaidIcon sx={{width:60, height:60, margin: 'auto',  align:'center'}}/> 
        <Typography variant="subtitle1" align='center' color='green'> Paga cómodo y seguro</Typography>
       </CardActionArea>
    </Card>    

    <Card sx={{ width:300, height:120}}>
       <CardActionArea sx={{width:300, height:120, }}>         
          <CreditCardIcon sx={{width:60, height:60, margin: 'auto',  align:'center'}}/> 
        <Typography variant="subtitle1" align='center' color='green'>Hasta 12 cuotas</Typography>
       </CardActionArea>
    </Card> 

    <Card sx={{ width:300, height:120}}>
       <CardActionArea sx={{width:300, height:120, }}>         
          <CreditCardIcon sx={{width:60, height:60, margin: 'auto',  align:'center'}}/> 
        <Typography variant="subtitle1" align='center' color='green'>Tarjeta de débito</Typography>
       </CardActionArea>
    </Card> 

    <Card sx={{ width:300, height:120}}>
       <CardActionArea sx={{width:300, height:120, }}>         
          <CreditCardIcon sx={{width:60, height:60, margin: 'auto',  align:'center'}}/> 
        <Typography variant="subtitle1" align='center' color='green'>Más medios de pago</Typography>
       </CardActionArea>
    </Card> 

    </Grid>


    
  );
}
