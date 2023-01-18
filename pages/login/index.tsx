import React, { useRef, useState } from "react"
import Head from "next/head"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import LoginLayout from "src/layouts/login/LoginLayout"

type FormValues = {
    ruc: string
    password: string
}

const PageLogin = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        setShowPassword((show) => !show);
    };

    const handleSubmitLogin = (data: FormValues): void => {
        console.log(data);
    }

    return (
        <LoginLayout illustration="https://tienda.socio-perseo.com/assets/media/perseologo.png">
            <Head>
                <title>Inicio de sesión</title>
            </Head>
            <Box component={"div"} >
                <Typography component={"h1"} variant="h4">Iniciar Sesión</Typography>
                <Box component={"form"} onSubmit={handleSubmit(handleSubmitLogin)} marginTop={2} display={"grid"} gap={2}>
                    <TextField
                        fullWidth
                        label="Identificación"
                        type={"number"}
                        variant="outlined"
                        margin="dense"
                        {...register('ruc', {
                            required: 'La indentificación es requerida'
                        })}
                        error={!!errors.ruc}
                        helperText={errors.ruc?.message}
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClick}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff color={!!errors.password ? "error" : "inherit"} /> : <Visibility color={!!errors.password ? "error" : "inherit"} />}
                                </IconButton>
                            </InputAdornment>
                        }}
                        {...register('password', {
                            required: 'La contraseña es requerida'
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" size="large" variant="contained" color="secondary">Iniciar Sesión</Button>
                </Box>
            </Box>
        </LoginLayout>
    )
}

export default PageLogin