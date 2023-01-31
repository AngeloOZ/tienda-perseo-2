import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'src/components/image/Image';
// import Link from '@mui/material/Link';
import { Categoria } from '@prisma/client';
import Link from 'next/link';

interface Props {
  categoria: Categoria;
}

export default function CategoriaCart({ categoria }: Props) {
  return (

    <Card sx={{ width: 170, height: 170, boxShadow: 5, marginX: 1, marginY: 0.7 }}>
      <Link href={`/tienda/categoria/${categoria.ruta}`} style={{ textDecoration: 'none' }}>
        <CardActionArea sx={{ width: 170, height: 170, }} >
          <Image
            alt={'icono'}
            src={categoria.icono}
            sx={{
              width: 50,
              height: 50,
              margin: 'auto'

            }}
          />
          <Typography variant="subtitle1" paddingTop={3} align='center' color='green'> {categoria.nombre}</Typography>
        </CardActionArea>
      </Link>

    </Card>
  );
}
