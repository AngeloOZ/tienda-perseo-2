import { Usuario } from 'interfaces';
import jwt from 'jsonwebtoken';


export const signToken = ({ correo, identificacion, id, rol, nombres }: Usuario) => {

    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    return jwt.sign(
        // payload
        { id, identificacion, nombres, correo, rol },
        // Seed
        process.env.JWT_SECRET_SEED,
        // Opciones
        { expiresIn: '30d' }
    )

}



export const isValidToken = (token: string): Promise<number> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT no es válido');

                const { id } = payload as { id: number };

                resolve(id);

            })
        } catch (error) {
            reject('JWT no es válido');
        }
    })

}
