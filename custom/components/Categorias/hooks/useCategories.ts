import { tiendaApi } from "custom/api"
import { ICategoria } from "interfaces"
import { useConverterb64Files } from "custom/hooks"
import { useObtenerCategories } from ".";


export const useCategories = () => {
    const { getImageBase64 } = useConverterb64Files();
    const { mutateCategories } = useObtenerCategories();

    const agregarCategoria = async (categoria: ICategoria) => {
        const icono = await getImageBase64(categoria.icono!);

        const { data: category } = await tiendaApi.post('/categories', {
            ...categoria,
            icono
        });
        mutateCategories();

    }

    const editarCategoria = async (categoria: ICategoria) => {
        const icono = await getImageBase64(categoria.icono!);

        const { data: category } = await tiendaApi.put('/categories', {
            ...categoria,
            icono
        });
        mutateCategories();
    }

    const eliminarCategoria = async (id: number) => {
        const { data: category } = await tiendaApi.delete(`/categories?id=${id}`);
        mutateCategories();
    }

    return { agregarCategoria, editarCategoria, eliminarCategoria }
}
