import { Box, BoxProps } from "@mui/material"
import { Categoria } from "@prisma/client"
import { CategoryItem } from "."

interface Props extends BoxProps {
    categories: Categoria[]
}

export const CategoryList = ({ categories, ...other }: Props) => {
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
            {categories.map((category) => <CategoryItem key={category.id} category={category} />)}
        </Box>
    )
}
