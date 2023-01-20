import { Usuario } from 'interfaces'
import { AuthState } from './'

type AuthActionType =
    | { type: 'AUTH_LOGIN', payload: Usuario }
    | { type: 'AUTH_LOGOUT' }
    | { type: 'AUTH_INITIAL' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case 'AUTH_INITIAL':
            return {
                ...state,
                isInitialized: false
            }
        case 'AUTH_LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user: action.payload
            }
        case 'AUTH_LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                isInitialized: true,
                user: undefined
            }
        default:
            return state;
    }
}