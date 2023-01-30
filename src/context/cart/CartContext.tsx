import { createContext } from "react";
import { ICheckoutCartItem } from "src/@types/product";

interface ContextProps {        
    activeStep: number;
    cart: ICheckoutCartItem[];
    subtotal: number;
    iva: number;
    total: number;
    discount: number;
    shipping: number;
    billing: null;  //TODO: revisar que hace
    totalItems: number;   

    //Metohds Handle
    handleAddCart: (product: ICheckoutCartItem) => void;
    handleDeleteCart: (productId: string) => void;
    handleIncreaseQuantity: (productId: string) => void;
    handleDecreaseQuantity: (productId: string) => void;
    handleApplyDiscount: (value: number) => void;
    //TODO: crear un metodo reset del carrito 
    
}

export const CartContext = createContext({} as ContextProps)