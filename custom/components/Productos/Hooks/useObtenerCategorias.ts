import { Categoria } from "@prisma/client"
import axios from "axios";
import { useEffect, useState } from "react"


export const useObtenerCategorias = () => {
    const [categories, setcategories] = useState<Categoria[]>([]);
    const getCategories = async () => {
        const categories = await axios.get('/api/categories');
        setcategories(categories.data);
    }
    useEffect(() => {
        getCategories();
    }, [])
    
    return { categories }
}
