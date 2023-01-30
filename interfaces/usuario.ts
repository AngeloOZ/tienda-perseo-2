export interface Usuario {
    id?: Number
    identificacion: string
    correo : string
    nombre : string
    clave : string
    rol: string
    fechacreado? : string | Date | null
}