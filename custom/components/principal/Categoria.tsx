import { FC, useState } from 'react';
import { Box } from '@mui/material';
import CategoriaCart from './CategoriaCart';
import { categoria as CategoriaI } from '@prisma/client';
import { useRouter } from 'next/router';
import { DEFAULT_VENDEDOR } from 'src/routes/paths';

interface Props {
  categoria: CategoriaI[];
}



export const Categoria: FC<Props> = ({ categoria }) => {
  const { query: { vendedor } } = useRouter() as any;
  const [idVendedor, setIdVendedor] = useState<string>(vendedor || DEFAULT_VENDEDOR.toString());

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent='center'
      flexWrap="wrap"
      marginTop={3}
    >
      {categoria?.map((cate: CategoriaI) => (
        <CategoriaCart
          vendedor={idVendedor}
          key={cate.id}
          categoria={cate}
        />
      ))}
    </Box>
  );
};
