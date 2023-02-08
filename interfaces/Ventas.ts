import { FormFactura } from ".";

export interface VentaRequest extends FormFactura {
    cart: {
        id: number;
        quantity: number;
    }
};