import type { NextApiRequest, NextApiResponse } from 'next';
import { pagoplux } from 'utils';


export default function (req: NextApiRequest, res: NextApiResponse) {
    const clave = pagoplux.generateKey();

    res.status(200).json({
        key: clave,
        number: pagoplux.cifrar_AES("4985414643765302", clave),
        expirationYear: pagoplux.cifrar_AES("2026", clave),
        expirationMonth: pagoplux.cifrar_AES("04", clave),
        cvv: pagoplux.cifrar_AES("345", clave),
        nombre: pagoplux.cifrar_AES("Ms. Brooke Lindgren", clave),
        rsa: pagoplux.cifrar_RSA(clave)


    })
}