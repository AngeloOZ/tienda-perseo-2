export interface IProducto {
    id?: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    category: string;
    images_list: [] | File[] | (File & { preview: string; })[];
    cover: string | File | null;
    status: boolean;
    rating: string;
};

