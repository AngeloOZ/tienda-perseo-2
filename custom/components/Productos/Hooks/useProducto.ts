import { IProducto } from "interfaces";
import { useConverterb64Files } from "custom/hooks";
import { tiendaApi } from "custom/api";
import { useObtenerProductos } from "./useObtenerProductos";

export const useProducto = () => {
    const {mutateProducts} =useObtenerProductos();


    const agregarProducto = async (producto: IProducto) => {

        const { getImageBase64 } = useConverterb64Files();
        let images = [] as string[];

        for (const file of producto.images) {
            const image = await getImageBase64(file);
            if (image) {
                images = [...images, image];
            }
        }
        const cover = await getImageBase64(producto.cover as File);

        const { data } = await tiendaApi.post('/products', {
            ...producto,
            images,
            cover
        });

    }

    const editarProducto = async (producto: IProducto) => {
        const { getImageBase64 } = useConverterb64Files();
        let images = [] as string[];

        for (const file of producto.images) {
            const image = await getImageBase64(file);
            if (image) {
                images = [...images, image];
            }
        }

        const cover = await getImageBase64(producto.cover!);

        const { data } = await tiendaApi.put('/products', {
            ...producto,
            images,
            cover
        });
    }

    const eliminarProducto = async (id: number) => {
        const { data } = await tiendaApi.delete(`/products?id=${id}`);
        mutateProducts();
    }

    return { agregarProducto, editarProducto, eliminarProducto }
}
