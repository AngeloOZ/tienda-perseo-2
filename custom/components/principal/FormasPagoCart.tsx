import * as React from 'react';
import { FC } from 'react';

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
import Image from 'src/components/image/Image';

type FormPago = {
  icono: string;
  title: string;
};

interface Props {
  FormPago: FormPago;
}

export default function FormasPagoCart({ FormPago }: Props) {
  const [value, setValue] = React.useState(0);

  return (
    <Grid>
      <Card sx={{ width: 300, height: 100, marginX: 1, marginY:0.7, boxShadow: 3 }}>
        <Image
          alt={'icono'}
          src={FormPago.icono}
          sx={{
            width: 70,
            height: 70,
            margin: 'auto',
            align: 'center',
            //paddingTop:1
          }}
          
        />
        <Typography variant="subtitle1" align="center" color="green">
          {FormPago.title}
        </Typography>
      </Card>
    </Grid>
  );
}
