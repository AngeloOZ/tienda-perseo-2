import { Skeleton, TableCell, TableRow } from "@mui/material"

type Props = {
    rows?: number,
    columns?: number
}
export const SkeletonTable = ({ rows = 4, columns = 6 }: Props) => {

    const renderColumns = () => {
        let columnsArr = [];
        for (let i = 0; i < columns; i++) {
            columnsArr.push(<TableCell key={i}><Skeleton /></TableCell>)
        }
        return columnsArr;
    }

    const renderRows = () => {
        let rowsArr = [];
        for (let i = 0; i < rows; i++) {
            rowsArr.push(
                <TableRow key={i}>
                    {renderColumns()}
                </TableRow>
            )
        }
        return rowsArr;
    }

    return <>{renderRows()}</>
}
