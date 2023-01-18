import { Box, Grid } from '@mui/material'
import React from 'react'
import { ShopProductCard } from 'src/sections/shop'

const index = () => {
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
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />
                    <ShopProductCard product={[]} />

            </Box>

        </div>
    )
}

export default index