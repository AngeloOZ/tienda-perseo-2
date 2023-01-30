// ----------------------------------------------------------------------
export type IProductReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date | string | number;
};

export type IProduct = {
  id: string;  
  name: string;
  description: string;      
  stock: number; //stock
  price: number;      
  categoria: ICategoria
  images: string[];
  cover: string;
  status: boolean;  //in bool data
  priceSale: number | null;
  rating: number;   
};

// ----------------------------------------------------------------------

export type ICheckoutCartItem = {
  id: string;
  name: string;
  cover: string;
  stock: number;  
  price: number;  
  quantity: number;
  subtotal: number;
};

export type ICheckoutBillingAddress = {
  receiver: string;
  phoneNumber: string;
  fullAddress: string;
  addressType: string;
  isDefault: boolean;
};
// ----------------------------------------------------------------------

export type IProductCheckoutState = {
  activeStep: number;
  cart: ICheckoutCartItem[];
  subtotal: number;
  iva: number
  total: number;
  discount: number;
  shipping: number;
  billing: ICheckoutBillingAddress | null;
  totalItems: number;
};


//----------------------------------------------------------------------

export type ICategoria={
  id: string;  
  nombre: string;
  icono: string;
}