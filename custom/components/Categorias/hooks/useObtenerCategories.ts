
import { Categoria } from "@prisma/client";
import { tiendaApi } from "custom/api";
import useSWR from "swr";

const fetcher = (url: string) => tiendaApi.get(url).then(r => r.data)

type Data = {
    categories: Categoria[];
    isLoading: boolean;
    error: any;
    mutateCategories: () => void;
}

export const useObtenerCategories = (initalData = {}): Data => {
    const { data, isLoading, error, mutate } = useSWR('/categories', fetcher, { fallbackData: initalData });

    return {
        categories: data,
        isLoading,
        error,
        mutateCategories: mutate
    }
}
