import { categoria } from "@prisma/client"
import axios from "axios";
import { useEffect, useState } from "react"


export const useObtenerCategorias = () => {
    const [categories, setcategories] = useState<categoria[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const getCategories = async () => {
        setIsLoading(true);
        const categories = await axios.get('/api/categories');
        setcategories(categories.data);
        setIsLoading(false);
    }
    useEffect(() => {
        getCategories();
    }, [])
    
    return { categories, isLoading }
}
