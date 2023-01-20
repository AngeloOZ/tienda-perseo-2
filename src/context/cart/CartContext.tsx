import { createContext } from "react";

import { IProductCheckoutState, ICheckoutCartItem } from "src/@types/product";

interface ContextProps {        
    activeStep: number;
    cart: ICheckoutCartItem[];
    subtotal: number;
    total: number;
    discount: number;
    shipping: number;
    billing: null;
    totalItems: number;   

    //Metohds Handle
    handleAddCart: (product: ICheckoutCartItem) => void;
    handleDeleteCart: (productId: string) => void;
    handleIncreaseQuantity: (productId: string) => void;
    handleDecreaseQuantity: (productID: string) => void;
    handleApplyDiscount: (value: number) => void;
}

export const CartContext = createContext({} as ContextProps)