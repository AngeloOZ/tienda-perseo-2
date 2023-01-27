import React, { FC, useEffect, useReducer, useState } from 'react';
import { CartContext, cartReducer } from './';

import { IProductCheckoutState, ICheckoutCartItem } from 'src/@types/product';

interface Props {
  children: React.ReactNode;
}

const CART_INITIAL_STATE: IProductCheckoutState = {
  activeStep: 0,
  cart: [],
  subtotal: 0,
  iva: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    if (state.cart.length === 0) {
      try {
        const cart: ICheckoutCartItem[] = localStorage.getItem('CART')
          ? JSON.parse(localStorage.getItem('CART')!)
          : [];      
          // console.log(cart);
            
        dispatch({ type: '[Cart] - Load Cart', payload: cart });
      } catch (e) {
        dispatch({ type: '[Cart] - Load Cart', payload: [] });
      }
    }
  }, []);

  useEffect(() => {
    // if (state.cart.length !== 0) {
    localStorage.setItem('CART', JSON.stringify(state.cart));
    // }
  }, [state.cart]);

  useEffect(() => {    
      const totalItems: number = state.cart.reduce(
        (acumulator: number, currentValue: ICheckoutCartItem) => currentValue.quantity + acumulator,
        0
      );
      const subtotal: number = state.cart.reduce(
        (acumulator: number, currentValue: ICheckoutCartItem) =>
          currentValue.quantity * currentValue.price + acumulator,
        0
      );
      const total: number = subtotal;

      const payload = {
        activeStep: 0,
        subtotal,
        total,
        discount: 0,
        shipping: 0,
        billing: null,
        totalItems,
      };
      dispatch({ type: '[Cart] - Update order sumary', payload });    
  }, [state.cart]);

  const handleAddCart = (newProduct: ICheckoutCartItem) => {
    dispatch({ type: '[Cart] - Add products in cart', payload: newProduct });
  };

  const handleDeleteCart = (productId: string) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: productId });
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch({ type: '[Cart] - Increase cart quantity', payload: productId });
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch({ type: '[Cart] - Decrease cart quantity', payload: productId });
  };

  const handleApplyDiscount = (value: number) => {
    if (state.cart.length) {
      dispatch({ type: '[Cart] - Apply discount in cart', payload: value });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleAddCart,
        handleDeleteCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleApplyDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
