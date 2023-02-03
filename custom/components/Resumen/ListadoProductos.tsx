import { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Typography } from '@mui/material';

import { CartContext } from 'context';
import Image from 'src/components/image/Image';


export const ListadoProductos = () => {
  const { cart } = useContext(CartContext);

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
                  <Typography variant="subtitle2" textTransform="capitalize" sx={{ maxWidth: 240, mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Image
                    alt={item.name}
                    src={item.cover}
                    sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
                  />
                </TableCell>
                <TableCell align="right">{item.price.toFixed(2)}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.subtotal.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}