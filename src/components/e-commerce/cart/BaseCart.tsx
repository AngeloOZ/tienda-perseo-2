import { FC } from 'react';
import sum from 'lodash/sum';
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import EmptyContent from 'src/components/empty-content';

import {
  CheckoutCartProductList,
  CheckoutSummary,
} from '../../../sections/checkout';
import { IProductCheckoutState } from 'src/@types/product';

interface Props {
  checkout: IProductCheckoutState;
  funDeleteCart: (productId: string) => void;
  funApplyDiscount: (value: number) => void;
  funIncreaseQuantity: (productId: string) => void;
  funDecreaseQuantity: (productID: string) => void;
  funShowCart: VoidFunction;
}

export const BaseCart: FC<Props> = ({
  checkout,
  funDeleteCart,
  funApplyDiscount,
  funIncreaseQuantity,
  funDecreaseQuantity,
  funShowCart,
}) => {
  const { cart, total, discount, subtotal, totalItems } = checkout;
  const isEmptyCart = !cart.length;

  return (
    <Container>
      <Box sx={{ width: 'auto', paddingTop: 10, paddingLeft: 0, paddingRight: 0 }}>

        <Button variant="contained" style={{ margin: 10 }} size="large" onClick={funShowCart}>
          <CloseIcon />
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Cart
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} item)
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
                  title="Cart is empty"
                  description="Look like you have no items in your shopping cart."
                  img="/assets/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              enableDiscount={true}
              total={total}
              discount={discount}
              subtotal={subtotal}
              onApplyDiscount={funApplyDiscount}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={!cart.length}
              // onClick={handleNextStep}
            >
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
