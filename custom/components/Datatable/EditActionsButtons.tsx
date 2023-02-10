import { useState } from "react";

import { Delete } from "@mui/icons-material"

import { Button, IconButton, MenuItem, TableCell } from "@mui/material"
import Iconify from "src/components/iconify/Iconify"
import MenuPopover from "src/components/menu-popover/MenuPopover";
import ConfirmDialog from "src/components/confirm-dialog/ConfirmDialog";


type Props = {
    listButton: boolean | undefined;
    row: any;
    handleClickDelete: (item: any) => void;
    handleClickEdit: (item: any) => void;
}


const EditActionsButtons = ({
    listButton,
    row,
    handleClickDelete = (item: any) => { },
    handleClickEdit = (item: any) => { }
}: Props) => {

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

    return (
        <>
            <TableCell align="center">
                {
                    listButton ?
                        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                        :
                        <>
                            <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(row)}>
                                <Delete fontSize="inherit" />
                            </IconButton>
                        </>
                }
            </TableCell>

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
                        handleClickEdit(row);
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
                    <Button 
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleCloseConfirm();
                            handleClickDelete(row);
                        }}>
                        Eliminar
                    </Button>
                }

            />
        </>
    )
}

export default EditActionsButtons