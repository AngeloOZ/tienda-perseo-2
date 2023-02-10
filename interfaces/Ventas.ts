import { ICheckoutCartItem } from "src/@types/product";
import { FormFactura } from ".";

export interface VentaRequest extends FormFactura {
    cart: {
        id: number;
        quantity: number;
    }
};
export interface VentaPorID {
    id_venta:       number;
    nombres:        string;
    identificacion: string;
    correo:         string;
    whatsapp:       string;
    productos:      ICheckoutCartItem[];
    vendedor:       null;
    fecha_creado:   string;
    subtotal:       number;
    total:          number;
    totalIVA:       number;
}