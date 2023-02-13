import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'src/components/image/Image';
import { categoria } from '@prisma/client';
import Link from 'next/link';

interface Props {
  categoria: categoria;
  vendedor: string;
}

export default function CategoriaCart({ vendedor, categoria }: Props) {
  return (

    <Card
      sx={{
        width: 170,
        height: 170,
        boxShadow: 5,
        marginX: 1,
        marginY: 0.7
      }}
    >
      <Link href={`/${vendedor}/tienda/categoria/${categoria.ruta}`} style={{ textDecoration: 'none' }}>
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
          <Typography variant="subtitle1" paddingTop={3} align='center' color='primary'> {categoria.nombre}</Typography>
        </CardActionArea>
      </Link>

    </Card>
  );
}
