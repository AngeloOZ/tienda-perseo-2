import { useContext, useState } from "react"
import { useRouter } from "next/router";
import Head from "next/head"
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Chip, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

// import { AuthContext } from ".";
import LoginLayout from "src/layouts/login/LoginLayout"
import { AuthContext } from "./context";

type FormValues = {
    identificacion: string
    clave: string
}

export const Login = () => {
    const router = useRouter();
    const { loginUser } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleClick = () => {
        setShowPassword((show) => !show);
    };

    const handleSubmitLogin = async ({ identificacion, clave }: FormValues) => {
        const isValidLogin = await loginUser(identificacion, clave);
        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        router.replace('/admin');
    }

    return (
        <LoginLayout illustration="https://tienda.socio-perseo.com/assets/media/perseologo.png">
            <Head>
                <title>Inicio de sesión</title>
            </Head>
            <Box component="div" >
                <Typography component="h1" variant="h4">Iniciar Sesión</Typography>
                <Chip
                    label="El usuario o la contraseña son incorrectos"
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                    style={{ marginTop: 4, marginBottom: 4 }}
                    sx={{ display: showError ? 'flex' : 'none' }}
                />
                <Box component="form" onSubmit={handleSubmit(handleSubmitLogin)} marginTop={2} display="grid" gap={2}>
                    <TextField
                        fullWidth
                        label="Identificación"
                        type="number"
                        variant="outlined"
                        margin="dense"
                        {...register('identificacion', {
                            required: 'La indentificación es requerida'
                        })}
                        error={!!errors.identificacion}
                        helperText={errors.identificacion?.message}
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
                                    {/* eslint-disable-next-line */}
                                    {showPassword ? <VisibilityOff color={!!errors.clave ? "error" : "inherit"} /> : <Visibility color={!!errors.clave ? "error" : "inherit"} />}
                                </IconButton>
                            </InputAdornment>
                        }}
                        {...register('clave', {
                            required: 'La contraseña es requerida'
                        })}
                        error={!!errors.clave}
                        helperText={errors.clave?.message}
                    />
                    <Button type="submit" size="large" variant="contained" color="secondary">Iniciar Sesión</Button>
                </Box>
            </Box>
        </LoginLayout>
    )
}
