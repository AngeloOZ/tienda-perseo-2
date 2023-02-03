import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

// @mui
import {
  Stack,
  Button,
  Rating,
  Divider,
  Typography,
  Chip,
} from '@mui/material';

// import { sentenceCase } from 'change-case';
import { fCurrency } from '../../utils/formatNumber';
// @types
import { IProduct, ICheckoutCartItem } from '../../@types/product';

import Iconify from '../../components/iconify';
import { IncrementerButton } from '../../components/custom-input';
import FormProvider from '../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<ICheckoutCartItem, 'colors'> {
  colors: string;
}

type Props = {
  product: IProduct;
  cart: ICheckoutCartItem[];
  onAddCart: (cartItem: ICheckoutCartItem) => void;
  onGotoStep: (step: number) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
};

export default function ProductDetailsSummary({
  cart,
  product,
  onAddCart,
  onGotoStep,
  onIncreaseQuantity,
  onDecreaseQuantity,
  ...other
}: Props) {


  const { id, name, price, cover, status, stock, rating } = product;


  const alreadyProduct = cart.map((item) => item.id).includes(id);

  // Disable the "Agregar Al Carrito" buttom
  const isMaxQuantity =
    cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= stock;

  // productForCart
  const defaultValues: ICheckoutCartItem = {
    id,
    name,
    cover,
    stock,
    price,
    quantity: stock < 1 ? 0 : 1,
    subtotal: 0,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (cart.length !== 0) {
      const cartRef = cart.filter((item) => item.id === id);
      setValue('quantity', cartRef[0].quantity);
    } else if (cart.length === 0 && !alreadyProduct) {
      setValue('quantity', stock < 1 ? 0 : 1);
    }
    // eslint-disable-next-line 
  }, [cart]);

  const funAddCart = async () => {
    try {
      if (cart.length === 0 && !alreadyProduct) {
        onAddCart({
          ...defaultValues,
          quantity: values.quantity,
          // subtotal: values.price * values.quantity
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line 
  const funIncreaseQuantity = () => {
    // eslint-disable-next-line 
    cart.length !== 0 && alreadyProduct
      ? onIncreaseQuantity(id)
      : setValue('quantity', values.quantity + 1);
  };

  // eslint-disable-next-line 
  const funDecreaseQuantity = () => {
    // eslint-disable-next-line 
    cart.length !== 0 && alreadyProduct
      ? onDecreaseQuantity(id)
      : setValue('quantity', values.quantity - 1);
  };

  /*   const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!alreadyProduct) {
        onAddCart({
          ...data,
          // colors: [values.colors],
          subtotal: data.price * data.quantity,
        });
      }
      onGotoStep(0);
      push('#');
    } catch (error) {
      console.error(error);
    }
  }; */

  return (
    <FormProvider methods={methods} onSubmit={() => { }}>
      <Stack
        spacing={3}
        sx={{
          p: (theme) => ({
            md: theme.spacing(5, 5, 0, 2),
          }),
        }}
        {...other}
      >
        <Stack spacing={2}>

          <Typography variant="h5">
            {name.toUpperCase()}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={rating} precision={0.1} readOnly />
          </Stack>

          <Typography variant="h4">
            {fCurrency(price)}
            <Typography variant="caption" fontSize={13} sx={{ fontStyle: 'italic' }}>
              + IVA
            </Typography>
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ height: 36, lineHeight: '36px' }}>
            Cantidad
          </Typography>

          <Stack spacing={1}>
            <IncrementerButton
              name="quantity"
              quantity={values.quantity}
              disabledDecrease={values.quantity <= 1}
              disabledIncrease={values.quantity >= stock}
              onIncrease={funIncreaseQuantity}
              onDecrease={funDecreaseQuantity}
            />

            <Typography
              variant="caption"
              component="div"
              sx={{ textAlign: 'right', color: 'text.secondary' }}
            >
              Disponible: {stock}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2}>
          {(status) ?
            (<Button
              fullWidth
              disabled={isMaxQuantity}
              size="large"
              color="warning"
              variant="contained"
              startIcon={<Iconify icon="ic:round-add-shopping-cart" />}
              onClick={funAddCart}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Agregar al Carrito
            </Button>) 
            :
          <Chip label="Agotado" color='error' variant="outlined" />}
          <Button fullWidth size="large" type="submit" variant="contained">
            Comprar Ahora
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
