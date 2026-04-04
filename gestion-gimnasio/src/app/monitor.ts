
export interface Monitor {
    _id?: string;
    nombre: string;
    fechaNacimiento: string;
    salario: number;
    turno: string;
    foto?: string; // base64 URL para vista en tarjetas
    nombreArchivo?: string; // nombre del archivo seleccionado
}
