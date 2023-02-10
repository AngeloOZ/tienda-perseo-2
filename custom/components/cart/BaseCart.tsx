import { FC } from 'react';
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import EmptyContent from 'src/components/empty-content';

import { IProductCheckoutState } from 'src/@types/product';
import {
  CheckoutCartProductList,
  CheckoutSummary,
} from '../../../src/sections/checkout';
import Link from 'next/link';
import { PATH_PAGE_TIENDA } from 'src/routes/paths';

interface Props {
  checkout: IProductCheckoutState;
  funDeleteCart: (productId: string) => void;
  funApplyDiscount: (value: number) => void;
  funIncreaseQuantity: (productId: string) => void;
  funDecreaseQuantity: (productID: string) => void;
  funResetCart: VoidFunction;
  funShowCart: VoidFunction;
}

export const BaseCart: FC<Props> = ({
  checkout,
  funDeleteCart,
  funApplyDiscount,
  funIncreaseQuantity,
  funDecreaseQuantity,
  funResetCart,
  funShowCart,
}) => {
  const { cart, total, discount, iva, subtotal, totalItems } = checkout;
  const isEmptyCart = !cart.length;

  return (
    <Container>
      <Box sx={{ width: 'auto', paddingTop: 3, paddingLeft: 0, paddingRight: 0 }}>

        <Button variant="contained" style={{ margin: 10 }} size="large" onClick={funShowCart}>
          <CloseIcon />
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Carrito
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} productos)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <CheckoutCartProductList
                  products={cart}
                  onDelete={funDeleteCart}
                  onIncreaseQuantity={funIncreaseQuantity}
                  onDecreaseQuantity={funDecreaseQuantity}
                />
              ) : (
                <EmptyContent
                  title="El carrito esta vacío"
                  description="No tiene productos en su carrito de compras."
                  img="../../../assets/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              // enableDiscount
              iva={iva}
              total={total}
              discount={discount}
              subtotal={subtotal}
              onApplyDiscount={funApplyDiscount}
            />
            <Link href={PATH_PAGE_TIENDA.tienda.resumen} legacyBehavior>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={!cart.length}
                sx={{ mb: 2 }}

              >
                Siguiente
              </Button>
            </Link>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="outlined"
              onClick={funResetCart}
              sx={{ mb: 2 }}
              disabled={!cart.length}
              color="error"
            >
              Vaciar Carrito
            </Button>

            {/* <Button 
              fullWidth
              size="large"
              type="submit"
              variant="outlined" 
              onClick={funShowCart}
              sx={{ mb:2 }}
              >
              Cerrar
            </Button>             */}

          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
