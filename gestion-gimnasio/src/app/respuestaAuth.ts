export interface RespuestaAuth {
  message: string;
  codigo?: string;
  rol?: 'usuario' | 'admin';
}
