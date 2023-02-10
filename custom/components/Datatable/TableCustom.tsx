import { useMemo, useState } from 'react';

import { InputAdornment, Stack, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import { Search } from '@mui/icons-material';

import { ExportButtons, RenderTableBody } from '.';


type HeaderProp = {
    name: string;
    label: string;
    align?: 'left' | 'right' | 'center' | "inherit" | "justify";
    order?: boolean;
    type?: 'number' | 'string' | 'date' | 'boolean';
    serchable?: boolean;
}
interface Props {
    headers: HeaderProp[];
    dataBody: any[];
    maxHeight?: number;
    pagination?: boolean;
    isActions?: boolean;
    listButton?: boolean;
    isLoading?: boolean;
    exportOptions?: boolean;

    handleDelete?: (item: any) => void;
    handeEdit?: (item: any) => void;

}

export function TableCustom({ headers, dataBody, pagination = true, maxHeight, exportOptions = false, isActions, listButton = true, isLoading, handleDelete = () => { }, handeEdit = () => { } }: Props) {
    // Filtros
    const [buscador, setBuscador] = useState('');

    const handleBuscador = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuscador(event.target.value);
    }

    const allData = useMemo(() => {
        if (buscador === '') return dataBody;

        const filter = headers.filter((header) => {
            if (header.serchable != false) return header;
        }).map((header) => header.name);

        if (filter.length > 0) {
            const data = dataBody.filter((item: any) => {
                for (let variable of filter) {
                    if (item[variable].toLowerCase().includes(buscador.toLowerCase())) return item;
                }
            })
            return data;
        }
        return dataBody;
    }, [dataBody, buscador]);


    // Paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight ? maxHeight : 500, padding: 1 }}>
                <Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
                    <TextField
                        variant="outlined"
                        placeholder='Buscador'
                        size='small'
                        value={buscador}
                        onChange={handleBuscador}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {exportOptions && <ExportButtons data={allData} headers={headers} />}

                </Stack>

                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                headers.map((header) => (
                                    <TableCell
                                        key={header.name}
                                        align={header.align || 'left'}
                                    >
                                        {header.label}
                                    </TableCell>))
                            }
                            {isActions && <TableCell align="center">Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RenderTableBody 
                            isLoading={isLoading}
                            isActions={isActions}
                            allData={allData}
                            headers={headers}
                            listButton={listButton}
                            handleClickDelete={handleDelete}
                            handleClickEdit={handeEdit}
                            pagination={pagination}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </TableBody>
                </Table>
            </TableContainer>

            {
                pagination &&
                <TablePagination
                    labelRowsPerPage="Filas por página"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={allData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }

        </Paper>
    );
}
