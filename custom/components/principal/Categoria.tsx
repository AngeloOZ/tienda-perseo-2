import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Icon from 'src/components/color-utils/Icon';
import CreditCardIcon from '@mui/icons-material/CreditCard';



export default function Categoria() {
  return (

    <Box 
    sx={{margin: 'auto', flexGrow: 1, alignContent: 'center'}}
    gap={0}
    display="grid"
    paddingTop={3}
   // paddingRight={}
    paddingLeft={{
        xs:1.5,
        md:50
    }}
    alignContent={'center'}
    gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(4, 1fr)',
        md: 'repeat(7, 1fr)',
        lg: 'repeat(7, 1fr)',
    }}
    
    >
    <Card sx={{ width:170, height:170}}>
       <CardActionArea sx={{width:170, height:170, margin:'auto'}}>
         <CreditCardIcon sx={{height: 50, width:50, margin:'auto', alignContent:'center'}}/>
          <Typography variant="h5">
            Categoria1
          </Typography>
       </CardActionArea>
    </Card>

    <Card sx={{ width:170, height:170}}>
       <CardActionArea sx={{width:170, height:170, margin:'auto'}}>
         <CreditCardIcon sx={{height: 50, width:50, margin:'auto', alignContent:'center'}}/>
          <Typography variant="h5">
            Categoria2
          </Typography>
       </CardActionArea>
    </Card>

    <Card sx={{ width:170, height:170}}>
       <CardActionArea sx={{width:170, height:170, margin:'auto'}}>
         <CreditCardIcon sx={{height: 50, width:50, margin:'auto', alignContent:'center'}}/>
          <Typography variant="h5">
            Categoria3
          </Typography>
       </CardActionArea>
    </Card>

    <Card sx={{ width:170, height:170}}>
       <CardActionArea sx={{width:170, height:170, margin:'auto'}}>
         <CreditCardIcon sx={{height: 50, width:50, margin:'auto', alignContent:'center'}}/>
          <Typography variant="h5">
            Categoria4
          </Typography>
       </CardActionArea>
    </Card>

    <Card sx={{ width:170, height:170}}>
       <CardActionArea sx={{width:170, height:170, margin:'auto'}}>
         <CreditCardIcon sx={{height: 50, width:50, margin:'auto', alignContent:'center'}}/>
          <Typography variant="h5">
            Categoria5
          </Typography>
       </CardActionArea>
    </Card>

    </Box>
    
  );
}
