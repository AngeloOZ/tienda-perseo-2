// import { Usuario } from '@prisma/client';
import { Usuario } from 'interfaces';
import { createContext } from 'react'

interface ContextProps {
    isInitialized: boolean;
    isLoggedIn: boolean;
    rol: string[];
    user?: Usuario;
    loginUser: (identificacion: string, clave: string) => Promise<boolean>;
    logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps)