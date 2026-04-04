import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';
import { RespuestaAuth } from '../respuestaAuth';

@Injectable({
  providedIn: 'root'
})
export class GestionarUsuarios {
  private http = inject(HttpClient);

  private apiURL =  'http://localhost:4000/usuarios';

  // Señal privada para el usuario autenticado (o null si nadie)
  private _usuarioActual = signal<String | null>(null);
  usuarioActual = this._usuarioActual.asReadonly();

  private _rolUsuario = signal<'usuario' | 'admin' | null>(null);
  rolUsuario = this._rolUsuario.asReadonly();

  constructor() {
    const storedUser = localStorage.getItem('usuario');
    const storedRol = localStorage.getItem('rol');
    if (storedUser) this._usuarioActual.set(storedUser);
    if (storedRol === 'admin' || storedRol === 'usuario') {
      this._rolUsuario.set(storedRol);
    }
  }

  // Computed para saber si está autenticado
  estaAutenticado = computed(() => this.usuarioActual() !== null);

  esAdmin = computed(() => this.rolUsuario() === 'admin');

  registro(codigo: string, clave: string, nombre: string, email: string) {
    return this.http.post<Boolean>(
      this.apiURL + "/registro",
      { codigo,clave,nombre,email}
    ).pipe(
      catchError(err => {
        console.error("Error en registro:", err);
        return of(false); // Devuelves un valor seguro si quieres
      })
    );
  }


  login(codigo: string, clave: string) {
    return this.http.post<RespuestaAuth>(
      this.apiURL + "/login",
      { codigo, clave }
    ).pipe(
      tap(response => {
        // Suponemos que la cookie ya fue enviada por el servidor
        // Aquí actualizamos la señal del usuario y rol
        const rol = (response as any)?.rol ?? 'usuario';
        this._usuarioActual.set(response.codigo || '');
        this._rolUsuario.set(rol as 'usuario' | 'admin');
        localStorage.setItem('usuario', response.codigo || '');
        localStorage.setItem('rol', rol);
        console.log('login set', response.codigo, rol);
      }),
        catchError(err => {
          console.error("Error en login:", err);
          return throwError(() => err); // O devuelves un observable controlado
        })
    );
  }

  logout() {
    return this.http.post<void>(
      this.apiURL + "/logout",
      {}
    ).pipe(
      tap(() => {
        this._usuarioActual.set(null);
        this._rolUsuario.set(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('rol');
      }),
        catchError(err => {
          console.error("Error en logout:", err);
          return throwError(() => err); // O devuelves un observable controlado
        })
    );
  }

  // Operaciones admin de usuarios
  getUsuarios() {
    return this.http.get<any[]>(this.apiURL);
  }

  getUsuario(id: string) {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  actualizarUsuario(id: string, usuario: any) {
    return this.http.put<any>(`${this.apiURL}/${id}`, usuario);
  }

  eliminarUsuario(id: string) {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  obtenerPerfil() {
    return this.http.get<any>(this.apiURL + '/perfil');
  }

}
