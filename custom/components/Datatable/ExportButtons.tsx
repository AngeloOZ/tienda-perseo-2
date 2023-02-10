import { useState } from "react";

import { Box, Button, MenuItem } from "@mui/material";

import { AiOutlineFilePdf, AiOutlineFileExcel } from "react-icons/ai";
import { BiExport } from "react-icons/bi";

import { useExportTable } from 'custom/hooks';
import MenuPopover from "src/components/menu-popover/MenuPopover";

type HeaderProp = {
    name: string;
    label: string;
    align?: 'left' | 'right' | 'center' | "inherit" | "justify";
    order?: boolean;
    type?: 'number' | 'string' | 'date' | 'boolean';
    serchable?: boolean;
}

export const ExportButtons = ({ data, headers }: { data: any, headers: HeaderProp[] }) => {
    const { exportXLSX, exportPDF } = useExportTable();

    const [openPopoverExport, setOpenPopoverExport] = useState<HTMLElement | null>(null);

    const handleOpenPopoverExport = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopoverExport(event.currentTarget);
    };

    const handleClosePopoverExport = () => {
        setOpenPopoverExport(null);
    };

    return (
        <Box>
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
                        exportXLSX(data)
                        handleClosePopoverExport();
                    }}
                >
                    <AiOutlineFileExcel color='#2e7d32' />
                    Exportar Excel
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        exportPDF("Reporte de ventas", headers, data);
                        handleClosePopoverExport();
                    }}
                >
                    <AiOutlineFilePdf color='#d32f2f' />
                    Exportar PDF
                </MenuItem>
            </MenuPopover>
        </Box>)
}
