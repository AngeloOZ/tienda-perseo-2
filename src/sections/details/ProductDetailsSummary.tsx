import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
// routes
// utils
import { fShortenNumber, fCurrency } from '../../../src/utils/formatNumber';
// @types
import { IProduct, ICheckoutCartItem } from '../../../src/@types/product';
// _mock
import { _socials } from '../../../src/_mock/arrays';
// components
import Label from '../../../src/components/label';
import Iconify from '../../../src/components/iconify';
import { IncrementerButton } from '../../../src/components/custom-input';
import { ColorSinglePicker } from '../../../src/components/color-utils';
import FormProvider, { RHFSelect } from '../../../src/components/hook-form';

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
  // const { push } = useRouter();

  const { id, name, price, cover, status, available, priceSale, totalRating, category } = product;

  const alreadyProduct = cart.map((item) => item.id).includes(id);

  //Disable the "Agregar Al Carrito" buttom
  const isMaxQuantity =
    cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  //productForCart
  const defaultValues: ICheckoutCartItem = {
    id,
    name,
    cover,
    available,
    price,
    quantity: available < 1 ? 0 : 1,
    subtotal: 0,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

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
    }else if(cart.length === 0 && !alreadyProduct){
      setValue('quantity', available < 1 ? 0 : 1);      
    }
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

  const funIncreaseQuantity = () => {
    cart.length !== 0 && alreadyProduct
      ? onIncreaseQuantity(id)
      : setValue('quantity', values.quantity + 1);
  };

  const funDecreaseQuantity = () => {
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
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        // colors: [values.colors],
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }; */
  // onSubmit={handleSubmit(onSubmit)}
  return (
    <FormProvider methods={methods} onSubmit={() => {}}>
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
          {/* <Typography
            variant="overline"
            component="div"
            sx={{
              color: status ? 'success.main' : 'warning.main',
            }}
          >
            {status ? 'Disponible' : 'Agotado'}
          </Typography> */}

          <Typography variant="h5">
            {name}
            <Label
              variant="soft"
              color={category ? 'primary' : 'warning'}
              sx={{ textTransform: 'uppercase', mr: 'auto' }}
            >
              {sentenceCase(category || '')}
            </Label>
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={totalRating} precision={0.1} readOnly />
          </Stack>

          <Typography variant="h4">
            {/* {priceSale && (
              <Box
                component="span"
                sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
              >
                {fCurrency(priceSale)}
              </Box>
            )} */}
            {fCurrency(price)}
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              + IVA
            </Typography>
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/*         <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">Color</Typography>

          <Controller
            name="colors"
            control={control}
            render={({ field }) => (
              <ColorSinglePicker
                colors={colors}
                value={field.value}
                onChange={field.onChange}
                sx={{
                  ...(colors.length > 4 && {
                    maxWidth: 144,
                    justifyContent: 'flex-end',
                  }),
                }}
              />
            )}
          />
        </Stack> */}

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ height: 36, lineHeight: '36px' }}>
            Cantidad
          </Typography>

          <Stack spacing={1}>
            <IncrementerButton
              name="quantity"
              quantity={values.quantity}
              disabledDecrease={values.quantity <= 1}
              disabledIncrease={values.quantity >= available}
              onIncrease={funIncreaseQuantity}
              onDecrease={funDecreaseQuantity}
            />

            <Typography
              variant="caption"
              component="div"
              sx={{ textAlign: 'right', color: 'text.secondary' }}
            >
              Disponible: {available}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2}>
          <Button
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
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Comprar Ahora
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
