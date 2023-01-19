import { Box, Grid } from '@mui/material'
import React from 'react'
import { ShopProductCard } from 'src/sections/shop'
import { ICheckoutCartItem } from 'src/@types/product'


export default function index () {
    const arrproducto: ICheckoutCartItem[] = [
        {
            id: "1",
            name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            cover: "https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg",
            available: 5,
            price: 109.95,
            colors: ["Rojo"],
            size: "M",
            quantity: 2,
            subtotal: 100.00
        },
    
        {
            id: "",
            name: "Mens Casual Premium Slim Fit T-Shirts",
            cover: "https://i.pinimg.com/564x/26/8b/e4/268be487927664b39974baa500d199ef--red-blazer-blazer-outfits.jpg",
            available: 8,
            price: 22.3,
            colors: ["Rojo", "Cafe"],
            size: "S",
            quantity: 1,
            subtotal: 20.00
        },
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
                {arrproducto.map((producto: ICheckoutCartItem) => (
                    <ShopProductCard key={producto.id} product={producto} />
                ))}
                    
                
            </Box>

        </div>
    )
}
