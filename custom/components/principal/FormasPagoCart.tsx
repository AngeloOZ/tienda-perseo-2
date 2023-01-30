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
import { Stack, height, spacing } from '@mui/system';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function FormasPagoCart() {
  const [value, setValue] = React.useState(0);

  return (
    <Grid container rowSpacing={10} columnSpacing={{ xs: 2, sm: 4, md: 4, lg:4, xl:4 }}  sx={{margin:'auto'}}>
      
      <Card sx={{ width:300, height:100, marginY:{sm:1, md:1}, border:1}}>
       <CardActionArea sx={{width:300, height:100 }}>         
          <PaidIcon sx={{width:60, height:60, margin: 'auto',  align:'center', marginTop:-2, marginLeft:2}}/> 
        <Typography variant="subtitle1" align='center' color='green' sx={{ marginTop:-6, marginLeft:5}}  > Paga cómodo y seguro</Typography>
       </CardActionArea>
    </Card>   

    <Card sx={{ width:300, height:100, marginX:{sm: 1, md:2, ml:2, xl:2}, marginY:{xs:2, sm:1, md:1}, border:1}} >
       <CardActionArea sx={{width:300, height:100}}>         
          <CreditCardIcon sx={{width:60, height:60, margin: 'auto',  align:'center', marginTop:-2, marginLeft:5}}/> 
        <Typography variant="subtitle1" align='center' color='green'  sx={{ marginTop:-6, marginLeft:6}} >Hasta 12 cuotas</Typography>
       </CardActionArea>
    </Card> 

    <Card sx={{ width:300, height:100, marginX:{sm: 0,md:2, ml:0, xl:0},marginY:{xs:1, sm:1, md:1}, border:1}}>
       <CardActionArea sx={{width:300, height:100, }}>         
          <CreditCardIcon sx={{width:60, height:60, margin: 'auto',  align:'center', marginTop:-2, marginLeft:5}}/> 
        <Typography variant="subtitle1" align='center' color='green' sx={{ marginTop:-6, marginLeft:6}}>Tarjeta de débito</Typography>
       </CardActionArea>
    </Card> 

    <Card sx={{ width:300, height:100, marginX:{sm: 1,md:2, ml:2, xl:2}, marginY:{xs:1 , sm:1, md:1}, border:1}}>
    <CardActionArea sx={{width:300, height:100, }}>         
          <CreditCardIcon sx={{width:60, height:60, margin: 'auto',  align:'center', marginTop:-2, marginLeft:5}}/> 
        <Typography variant="subtitle1" align='center' color='green' sx={{ marginTop:-6, marginLeft:9}}>Más medios de pago</Typography>
       </CardActionArea>
    </Card> 

    </Grid>


    
  );
}
