import { Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";
import { CartContext } from "context";
import { useContext } from "react";

export const ResumenCompra = () => {
    const { discount, subtotal, shipping, iva, total } = useContext(CartContext);
    return (
        <Card sx={{ m: 0, p: 0 }}>
            <CardHeader title="Resumen del pedido" />
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
