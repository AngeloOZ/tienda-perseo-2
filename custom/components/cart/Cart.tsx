import { useContext, FC } from 'react';
import { Box, Container } from '@mui/system';
import { CartContext } from '../../../context';
import { BaseCart } from './BaseCart';

interface Props {
  onShowCart: VoidFunction;
}

export const Cart:FC<Props> = ({onShowCart}) => {
  const ctx = useContext(CartContext);
  const { handleDeleteCart, handleIncreaseQuantity, handleDecreaseQuantity, handleApplyDiscount, handleResetCart } = ctx;

  return (    
      <Box sx={{ width: 'auto' }}>
        <Container>            
          <BaseCart
            checkout={ctx}
            funDeleteCart={handleDeleteCart}
            funApplyDiscount={handleApplyDiscount}
            funIncreaseQuantity={handleIncreaseQuantity}
            funDecreaseQuantity={handleDecreaseQuantity}
            funResetCart={handleResetCart}          
            funShowCart={onShowCart}
          />       
        </Container>
      </Box>    
  );
};
