import { ICheckoutCartItem, IProductCheckoutState } from 'src/@types/product';

type CartActionType =  
  | { type: '[Cart] - Add products in cart'; payload: ICheckoutCartItem }
  | { type: '[Cart] - Increase cart quantity'; payload: string }
  | { type: '[Cart] - Decrease cart quantity'; payload: string }
  | { type: '[Cart] - Remove product in cart'; payload: string }
  | {
      type: '[Cart] - Update order sumary';
      payload: {
        activeStep: number;
        subtotal: number;
        iva: number;
        total: number;
        discount: number;
        shipping: number;
        billing: null;
        totalItems: number;
      };
    }
  | { type: '[Cart] - Load Cart'; payload: ICheckoutCartItem[] }
  | { type: '[Cart] - Apply discount in cart'; payload: number }
  | { type: '[Cart] - Reset cart'; payload: IProductCheckoutState};

export const cartReducer = (state: IProductCheckoutState, action: CartActionType): any => {
  switch (action.type) {
    case '[Cart] - Load Cart':
      return {
        ...state,
        cart: [...action.payload],
      };

    case '[Cart] - Add products in cart':      
      return { ...state, cart: [...state.cart, action.payload] };

    case '[Cart] - Increase cart quantity':
      const productId_I = action.payload;
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === productId_I) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        }),
      };

    case '[Cart] - Decrease cart quantity':
      const productId_D = action.payload;
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === productId_D && product.quantity > 0) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          return product;
        }),
      };

    case '[Cart] - Remove product in cart':
      const productId_R = action.payload;
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== productId_R),
      };

    case '[Cart] - Update order sumary':
      return {
        ...state,
        //...action.payload
        activeStep: action.payload.activeStep,
        subtotal: action.payload.subtotal,
        iva: action.payload.iva,
        total: action.payload.total,
        discount: action.payload.discount,
        shipping: action.payload.shipping,
        billing: action.payload.billing,
        totalItems: action.payload.totalItems,
      };

    case '[Cart] - Apply discount in cart':
      const discount = action.payload;
      return {
        ...state,
        discount,
        total: state.subtotal - discount,
      };

    case '[Cart] - Reset cart':
      return action.payload;
      
    default:
      return state;
  }
};
