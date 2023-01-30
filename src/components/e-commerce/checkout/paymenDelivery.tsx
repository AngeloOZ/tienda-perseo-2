import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import {
    Box,
    Card,
    Radio,
    Paper,
    CardProps,
    Typography,
    RadioGroup,
    CardHeader,
    CardContent,
    FormControlLabel,
} from '@mui/material';

import { ICheckoutDeliveryOption } from 'src/@types/product';
import Iconify from 'src/components/iconify';

//_----------------------------------------------------------------------//

interface Props extends CardProps {
    deliveryOptionss: ICheckoutDeliveryOption[];
    onApplyShipping: (shipping: number) => void;
}

//_----------------------------------------------------------------------//

export default function PaymenDelivery({ deliveryOptionss, onApplyShipping, ...other }: Props) {
    const { control } = useFormContext();
    return (
        <Card {...other}>
            <CardHeader title="Opciones de Envio" />
            <CardContent>
                < Controller
                    name="Envio"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            onChange={(event) => {
                                const { value } = event.target;
                                field.onChange(Number(value));
                                onApplyShipping(Number(value));
                            }}
                        >
                            <Box gap={2}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat (1, 1fr)',
                                    sm: 'repeat(2, 1fr)',
                                }}
                            >
                                {deliveryOptionss.map((option) => (
                                    <DeliveryOptionn
                                        key={option.value}
                                        option={option}
                                        isSelected={field.value === option.value}
                                    />
                                ))}
                            </Box>
                        </RadioGroup>
                    )}
                />
            </CardContent>
        </Card>
    )
}

//_----------------------------------------------------------------------//

type DeliveryOptionProps = {
    option: ICheckoutDeliveryOption;
    isSelected: boolean;
};

//_----------------------------------------------------------------------//

function DeliveryOptionn({ option, isSelected }: DeliveryOptionProps) {
    const { value, title, description } = option;

    return (
        <Paper
            variant="outlined"
            key={value}
            sx={{
                display: 'flex',
                alignItems: 'center',
                transition: (theme) => theme.transitions.create('all'),
                ...(isSelected && {
                    boxShadow: (theme) => theme.customShadows.z20,
                })
            }}
        >
            <FormControlLabel
                value={value}
                control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
                label={
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle2">{title}</Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    </Box>
                }
                sx={{ py: 3, px: 2.5, flexGrow: 1, mr: 0 }}
            />


        </Paper>
    )
}
