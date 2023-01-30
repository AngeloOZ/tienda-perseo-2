import React from 'react'
import { useState } from 'react'

import { PaymentNewCardDialog } from 'src/sections/payment';
import { Controller, useFormContext } from 'react-hook-form';

import Iconify from 'src/components/iconify';
import {
    Card, Typography, Stack,
    FormControlLabel,
    Radio,
    Box,
    RadioGroup,
    Button,
    TextField,
    FormHelperText,
    CardProps,
    CardHeader,
    CardContent,
    Paper
} from '@mui/material'

import { ICheckoutCardOption, ICheckoutPaymentOption } from 'src/@types/product';
import Image from 'src/components/image/Image';



//_----------------------------------------------------------------------//

interface Props extends CardProps {
    paymentOptions: ICheckoutPaymentOption[];
    cardOptions: ICheckoutCardOption[];
}

//_----------------------------------------------------------------------//

export function PaymenCard({ paymentOptions, cardOptions, ...other }: Props) {
    const { control } = useFormContext();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (

        <>
            <Card {...other}>
                <CardHeader title="Opciones de pago" />
                <CardContent>
                    <Controller
                        name="payment"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <RadioGroup row {...field}>
                                    <Stack spacing={3} sx={{ width: 1 }}>
                                        {paymentOptions.map((option) => (
                                            <PaymentOption
                                                key={option.title}
                                                option={option}
                                                cardOptions={cardOptions}
                                                hasChild={option.value === 'credit_card'}
                                                isSelected={field.value === option.value}
                                                isCreditMethod={
                                                    option.value === 'credit_card' && field.value === 'credit_card'
                                                }
                                                onOpen={handleOpen}
                                            />
                                        ))}
                                    </Stack>
                                </RadioGroup>
                                {!!error && (
                                    <FormHelperText error sx={{ pt: 1, px: 2 }}>
                                        {error.message}
                                    </FormHelperText>
                                )}
                            </>
                        )}
                    />

                </CardContent>
            </Card>
            <PaymentNewCardDialog open={open} onClose={handleClose} />
        </>
    )
}

//_----------------------------------------------------------------------//

type PaymentOptionProps = {
    option: ICheckoutPaymentOption;
    cardOptions: ICheckoutCardOption[];
    hasChild: boolean;
    isSelected: boolean;
    isCreditMethod: boolean;
    onOpen: VoidFunction;
}

//_----------------------------------------------------------------------//

function PaymentOption({
    option,
    cardOptions,
    isSelected,
    isCreditMethod,
    hasChild,
    onOpen
}: PaymentOptionProps) {
    const { value, title, icons, description } = option;

    return (

        <Paper variant="outlined"
            sx={{
                display: 'flex',
                alignItems: 'center',
                transition: (theme) => theme.transitions.create('all'),
                ...(isSelected && {
                    boxShadow: (theme) => theme.customShadows.z20,
                }),
                ...(hasChild && {
                    flexWrap: 'wrap',
                }),
            }}
        >
            <FormControlLabel
                value={value}
                control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
                label={
                    <Box sx={{ ml: 1}} >
                        <Typography variant="subtitle2">{title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    </Box>
                }
                sx={{ py: 3, pl: 2.5, flexGrow: 1, mr: 0 }}
            />
            <Stack
                direction="row"
                spacing={1}
                flexShrink={0}
                sx={{
                    pr: 2.5,
                    display: {
                        xs: 'none',
                        sm: 'inline-flex',
                    },
                }}
            >
                {icons.map((icon) => (
                    <Image key={icon} disabledEffect alt="logo card" src={icon} />

                ))}

            </Stack>

            {isCreditMethod && (
                <Stack
                    alignItems="flex-start"
                    sx={{
                        px: 3,
                        width: 1,
                    }}
                >
                    <TextField select fullWidth label="Cards" SelectProps={{ native: true }}>
                        {cardOptions.map((card) => (
                            <option key={card.value} value={card.value}>
                                {card.label}
                            </option>
                        ))}
                    </TextField>

                    <Button
                        size="small"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={onOpen}
                        sx={{ my: 3 }}
                    >
                        Agregar nueva Tarjeta
                        
                    </Button>
                </Stack>
            )}
        </Paper>
    )
}
