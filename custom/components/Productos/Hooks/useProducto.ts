
import axios from "axios"

import { useSnackbar } from '../../../../src/components/snackbar';
import { IProducto } from "interfaces";
import { useConverterb64Files } from "custom/hooks";


export const useProducto = () => {
    const { enqueueSnackbar } = useSnackbar();

    const agregarProducto = async (producto: IProducto) => {

        const { getImageBase64 } = useConverterb64Files();
        let images_list = [] as string[];

        for (const file of producto.images_list) {
            const image = await getImageBase64(file);
            if (image) {
                images_list = [...images_list, image];
            }
        }
        const cover = await getImageBase64(producto.cover as File);

        const { data } = await axios.post('/api/products', {
            ...producto,
            images_list,
            cover
        });
        console.log(data);
        
    }
    return { agregarProducto }
}
