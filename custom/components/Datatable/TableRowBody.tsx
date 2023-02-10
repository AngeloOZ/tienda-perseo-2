import { TableCell, TableRow } from "@mui/material";
import EditActionsButtons from "./EditActionsButtons";


type HeaderProp = {
    name: string;
    label: string;
    align?: 'left' | 'right' | 'center' | "inherit" | "justify";
    order?: boolean;
    type?: 'number' | 'string' | 'date' | 'boolean';
    serchable?: boolean;
}

type Props = {
    headers: HeaderProp[];
    row: any;
    listButton: boolean | undefined;
    isActions: boolean | undefined;
    handleClickDelete: (item: any) => void;
    handleClickEdit: (item: any) => void;
}

export const TableRowBody = ({
    headers,
    isActions,
    listButton,
    row,
    handleClickDelete = (item: any) => { },
    handleClickEdit = (item: any) => { }
}: Props) => {

    const renderText = (value: any, type = 'string') => {
        // if (type === 'date') return new Date(value).toLocaleDateString() + ' ' + new Date(value).toLocaleTimeString();
        if (type === 'number') return Number(value);
        return value;
    }


    return (
        <TableRow style={{ padding: 0 }} hover >
            {
                headers.map((header, i) => <TableCell key={header.name + i} align={header.align || 'left'}>{renderText(row[header.name], header?.type)}</TableCell>)
            }

            {isActions &&
                <EditActionsButtons
                    listButton={listButton}
                    row={row}
                    handleClickDelete={handleClickDelete}
                    handleClickEdit={handleClickEdit}
                />
            }
        </TableRow>
    )
}
