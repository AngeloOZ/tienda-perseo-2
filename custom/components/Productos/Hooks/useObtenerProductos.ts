
import { tiendaApi } from "custom/api";
import useSWR from "swr";

const fetcher = (url: string) => tiendaApi.get(url).then(r => r.data)

export const useObtenerProductos = (initalData = {}) => {
    const { data, isLoading, error, mutate } = useSWR('/products', fetcher, { fallbackData: initalData });
    return {
        products: data,
        isLoading,
        error,
        mutateProducts: mutate
    }
}
