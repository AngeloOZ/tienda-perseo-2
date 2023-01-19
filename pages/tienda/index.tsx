import { Box, Grid } from '@mui/material'
import React from 'react'
import { ShopProductCard } from 'src/sections/shop'



interface Productos {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: any;
}

export default function index () {
    const arrproducto: Productos[] = [
        {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg",
            rating: { rate: 3.9, count: 120 }
        },
    
        {
            id: 2,
            title: "Mens Casual Premium Slim Fit T-Shirts ",
            price: 22.3,
            description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            category: "men's clothing",
            image: "https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg",
            rating: { rate: 4.1, count: 259 }
        }
    ]

    return (
        <div>
            <Box
                gap={3}
                display="grid"
                padding={2}
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
            >
                {arrproducto.map((producto: Productos) => (
                    <ShopProductCard key={producto.id} product={producto} />
                ))}
                    
                
            </Box>

        </div>
    )
}
