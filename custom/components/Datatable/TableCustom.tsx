import { useMemo, useState } from 'react';

import { Box, Button, IconButton, InputAdornment, MenuItem, Stack, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import { Delete, Search } from '@mui/icons-material';
import { AiOutlineFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { BiExport } from "react-icons/bi";

import Iconify from 'src/components/iconify/Iconify';
import MenuPopover from 'src/components/menu-popover/MenuPopover';
import ConfirmDialog from 'src/components/confirm-dialog/ConfirmDialog';
import { useExportTable } from 'custom/hooks';
import { SkeletonTable } from '../skeletons';


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
    const { exportXLSX, exportPDF } = useExportTable();
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

    const renderText = (value: any, type = 'string') => {
        // if (type === 'date') return new Date(value).toLocaleDateString() + ' ' + new Date(value).toLocaleTimeString();
        if (type === 'number') return new Intl.NumberFormat('es-ES').format(value);
        return value;
    }

    const renderData = () => {
        const [openConfirm, setOpenConfirm] = useState(false);

        const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

        const handleOpenConfirm = () => {
            setOpenConfirm(true);
        };

        const handleCloseConfirm = () => {
            setOpenConfirm(false);
        };

        const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
            setOpenPopover(event.currentTarget);
        };

        const handleClosePopover = () => {
            setOpenPopover(null);
        };

        if (isLoading) return <SkeletonTable columns={headers.length + 1} rows={rowsPerPage} />

        if (dataBody.length === 0) return <TableRow><TableCell colSpan={headers.length + 1} align="center">No hay datos</TableCell></TableRow>

        const data = pagination ? allData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : allData;

        const body = data.map((row: any) => {
            return <TableRow style={{ padding: 0 }} hover role="checkbox" key={row.id_venta} >
                {
                    headers.map((header, i) => <TableCell key={header.name + i} align={header.align || 'left'}>{renderText(row[header.name], header?.type)}</TableCell>)
                }

                {isActions &&
                    <TableCell align="center">
                        {
                            listButton ?
                                <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                                    <Iconify icon="eva:more-vertical-fill" />
                                </IconButton>
                                :
                                <>
                                    <IconButton aria-label="delete" size="small" onClick={() => handleDelete(row)}>
                                        <Delete fontSize="inherit" />
                                    </IconButton>
                                </>
                        }
                    </TableCell>
                }
                <MenuPopover
                    open={openPopover}
                    onClose={handleClosePopover}
                    arrow="right-top"
                    sx={{ width: 140 }}
                >
                    <MenuItem
                        onClick={() => {
                            handleOpenConfirm();
                            handleClosePopover();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="eva:trash-2-outline" />
                        Eliminar
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            handeEdit(row);
                            handleClosePopover();
                        }}
                    >
                        <Iconify icon="eva:edit-fill" />
                        Editar
                    </MenuItem>
                </MenuPopover>

                <ConfirmDialog
                    sx={{ backgroundColor: 'transparent' }}
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    title="Borrar registro"
                    content="Está seguro de borrar este registro?"
                    action={
                        <Button variant="contained" color="error" onClick={() => handleDelete(row)}>
                            Eliminar
                        </Button>
                    }

                />
            </TableRow>
        });

        return body
    }

    // Exportar
    const renderExport = () => {
        const [openPopoverExport, setOpenPopoverExport] = useState<HTMLElement | null>(null);

        const handleOpenPopoverExport = (event: React.MouseEvent<HTMLElement>) => {
            setOpenPopoverExport(event.currentTarget);
        };

        const handleClosePopoverExport = () => {
            setOpenPopoverExport(null);
        };

        return <Box>
            <Button variant="outlined" color='secondary' endIcon={<BiExport />} onClick={handleOpenPopoverExport}>
                Exportar
            </Button>
            <MenuPopover
                open={openPopoverExport}
                onClose={handleClosePopoverExport}
                arrow="right-top"
                sx={{ width: 180 }}
            >
                <MenuItem
                    onClick={() => {
                        exportXLSX(allData)
                        handleClosePopoverExport();
                    }}
                >
                    <AiOutlineFileExcel color='#2e7d32' />
                    Exportar Excel
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        exportPDF("Reporte de ventas", headers, allData);
                        handleClosePopoverExport();
                    }}
                >
                    <AiOutlineFilePdf color='#d32f2f' />
                    Exportar PDF
                </MenuItem>
            </MenuPopover>
        </Box>
    }

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

                    {exportOptions && renderExport()}

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
                        {renderData()}
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