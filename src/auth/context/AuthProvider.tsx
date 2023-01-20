import { useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { Usuario } from 'interfaces';
import { tiendaApi } from 'custom/api';

type Props = {
    children: React.ReactNode
}

export interface AuthState {
    isInitialized: boolean;
    isLoggedIn: boolean;
    user?: Usuario
}

const AUTH_INITIAL_STATE = {
    isInitialized: false,
    isLoggedIn: false,
    user: undefined,
};



export const AuthProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        checkToken();
    }, [])


    const checkToken = async () => {
        try {
            dispatch({ type: 'AUTH_INITIAL' });
            const { data } = await tiendaApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'AUTH_LOGIN', payload: user });
        } catch (error) {
            console.log(error);
            Cookies.remove('token');
            dispatch({ type: 'AUTH_LOGOUT' });
        }
    }

    const loginUser = async (identificacion: string, clave: string): Promise<boolean> => {
        try {
            const { data } = await tiendaApi.post('/user/login', { identificacion, clave });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'AUTH_LOGIN', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    const logoutUser = async () => {

    }

    return (
        <AuthContext.Provider value={{
            ...state,
            // Methods
            loginUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>);
};