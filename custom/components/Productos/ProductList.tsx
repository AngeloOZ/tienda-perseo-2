import { Box, BoxProps } from "@mui/material"
import { producto } from "@prisma/client"
import { ProductoItem } from "."

interface Props extends BoxProps {
    products: producto[]
}

export const ProductList = ({ products, ...other }: Props) => {
    return (
        <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
            }}
            {...other}
        >
            {products.map((product) => <ProductoItem key={product.id} product={product} />)}
        </Box>
    )
}
