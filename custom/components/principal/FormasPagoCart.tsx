import { Card, Grid, Typography } from '@mui/material';
import Image from 'src/components/image/Image';

type FormPago = {
  icono: string;
  title: string;
};

interface Props {
  FormPago: FormPago;
}

export default function FormasPagoCart({ FormPago }: Props) {


  return (
    <Card
      sx={{ 
        width: 220,
        height: 120,
        boxShadow: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        alt={FormPago.title}
        src={FormPago.icono}
        sx={{
          width: 50,
          height: 50,
        }}
      />
      <Typography variant="subtitle1" mt={1} color="primary">
        {FormPago.title}
      </Typography>
    </Card>
  );
}
