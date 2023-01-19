import { useContext } from 'react';
import { Box, Container } from '@mui/system';
import { CartContext } from '../../../context';
import { CheckoutCart } from '../../../sections/@dashboard/e-commerce/checkout';
import { CustomBaseCart } from './BaseCart';

export const CustomCart = () => {
  const ctx = useContext(CartContext);
  const { handleDeleteCart, handleIncreaseQuantity, handleDecreaseQuantity, handleApplyDiscount } = ctx;

  //----------------------------------------------------------------

  return (
    <>
      <Box sx={{ width: 'auto' }}>
        <Container>          
          <CustomBaseCart
            checkout={ctx}
            funDeleteCart={handleDeleteCart}
            funApplyDiscount={handleApplyDiscount}
            funIncreaseQuantity={handleIncreaseQuantity}
            funDecreaseQuantity={handleDecreaseQuantity}
          />       
        </Container>
      </Box>
    </>
  );
};
