import { Box, Card, CardContent, CardHeader, CardProps, Divider, Stack, Typography } from "@mui/material";
import { CartContext } from "context";
import { useContext } from "react";

interface Props extends CardProps {
    discount?: number;
    subtotal: number;
    shipping?: number;
    iva: number;
    total: number;
    title?: string;
}

export const ResumenCompra = ({ title, discount, subtotal, iva, total, shipping, ...other }: Props) => {
    return (
        <Card sx={{ m: 0, p: 0 }} {...other}>
            <CardHeader title={title || "Resumen del pedido"} />
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Sub Total
                        </Typography>
                        <Typography variant="subtitle2">{subtotal.toFixed(2)}</Typography>
                    </Stack>

                    {
                        discount !== 0 && (
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Descuento
                                </Typography>
                                <Typography variant="subtitle2">{'-'}</Typography>
                                {/* <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography> */}
                            </Stack>
                        )
                    }

                    {
                        shipping !== 0 && (
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Envío
                                </Typography>
                                <Typography variant="subtitle2">
                                    {""}
                                </Typography>
                            </Stack>
                        )
                    }

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            IVA
                        </Typography>
                        <Typography variant="subtitle2">
                            {iva.toFixed(2)}
                        </Typography>
                    </Stack>

                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle1">Total</Typography>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                                {total.toFixed(2)}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic' }} />
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
