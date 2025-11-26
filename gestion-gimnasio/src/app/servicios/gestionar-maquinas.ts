// ==========================================
// IMPORTACIONES
// ==========================================
import { Injectable } from '@angular/core'; // Decorador para hacer esta clase inyectable
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Cliente HTTP y cabeceras
import { Observable, of } from 'rxjs'; // Observables - para programación reactiva
import { catchError, map, tap } from 'rxjs/operators'; // Operadores RxJS para transformar datos
import { LISTAMAQUINAS } from '../lista-maquinas'; // Datos locales (no se usan en este caso)
import { Maquina } from '../maquina'; // Interfaz que define la estructura de una máquina

// ==========================================
// DECORADOR: HACE LA CLASE INYECTABLE
// ==========================================
// @Injectable({ providedIn: 'root' }): 
// - Permite inyectar este servicio en cualquier componente
// - providedIn: 'root' = la instancia es única en toda la app (singleton)
@Injectable({
  providedIn: 'root',
})

// ==========================================
// CLASE SERVICIO: GESTIÓN DE MÁQUINAS
// ==========================================
// Este servicio gestiona todas las comunicaciones HTTP con la API de máquinas
export class GestionarMaquinas {

  // ==========================================
  // PROPIEDADES PRIVADAS
  // ==========================================
  private serviceUrl = '/maquinas.json'; // URL local (NO se usa actualmente)
  private apiRestUrl = 'http://localhost:4000/maquinas'; // URL de la API REST real
  
  // Opciones por defecto para las peticiones HTTP
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Declara que enviamos JSON
  };

  // ==========================================
  // CONSTRUCTOR - INYECCIÓN DE DEPENDENCIAS
  // ==========================================
  // Inyecta HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) { }

  // ==========================================
  // MÉTODO: OBTENER TODAS LAS MÁQUINAS
  // ==========================================
  // Retorna Observable<Maquina[]> - permite suscribirse a la respuesta
  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(this.apiRestUrl).pipe(
      // tap(): ejecuta un efecto secundario (aquí, log en consola) sin modificar los datos
      tap(_ => console.log('fetched maquinas')),
      // catchError(): captura errores y devuelve un valor por defecto (array vacío [])
      catchError(this.handleError<Maquina[]>('getMaquinas', []))
    );
  }

  // ==========================================
  // MÉTODO: OBTENER UNA MÁQUINA POR ID
  // ==========================================
  // Parámetro: _id = identificador único de la máquina
  // Retorna Observable<Maquina | undefined>
  getMaquina(_id: string): Observable<Maquina | undefined> {
    // Realiza GET a: http://localhost:4000/maquinas/{_id}
    return this.http.get<Maquina>(this.apiRestUrl + '/' + _id).pipe(
      tap(_ => console.log('fetched maquina')), // Log cuando se obtiene
      catchError(this.handleError<Maquina>('getMaquina')) // Manejo de errores
    );
  }

  // ==========================================
  // MÉTODO PRIVADO: MANEJO DE ERRORES
  // ==========================================
  // Parámetros:
  //   operation = nombre de la operación (para logs)
  //   result = valor por defecto a devolver si hay error
  // Retorna: función que captura el error y devuelve un Observable
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log del error en consola
      console.log(`${operation} failed: ${error.message}`); // Mensaje descriptivo
      // Devuelve el valor por defecto como Observable (para que el flujo no se interrumpa)
      return of(result as T);
    };
  }

  // ==========================================
  // MÉTODO: ACTUALIZAR UNA MÁQUINA (PUT)
  // ==========================================
  // Parámetro: maquina = objeto con los datos actualizados
  // PUT: reemplaza el recurso completo en el servidor
  actualizarMaquina(maquina: Maquina): Observable<any> {
    // Realiza PUT a: http://localhost:4000/maquinas/{_id} con los datos de la máquina
    return this.http.put(
      this.apiRestUrl + '/' + maquina._id,
      maquina,
      this.httpOptions // Incluye el Content-Type: application/json
    ).pipe(
      tap(_ => console.log(`Maquina actualizada _id=${maquina._id}`)), // Log de éxito
      catchError(this.handleError<any>('actualizarMaquina')) // Manejo de errores
    );
  }

  // ==========================================
  // MÉTODO: CREAR UNA NUEVA MÁQUINA (POST)
  // ==========================================
  // Parámetro: maquina = objeto con datos de la nueva máquina
  // POST: crea un nuevo recurso en el servidor
  addMaquina(maquina: Maquina): Observable<Maquina> {
    // Realiza POST a: http://localhost:4000/maquinas con los datos
    return this.http.post<Maquina>(
      this.apiRestUrl,
      maquina,
      this.httpOptions // Incluye headers
    ).pipe(
      // tap(): extrae el ID generado por el servidor y lo loguea
      tap((nuevaMaquina: Maquina) => console.log(`Maquina añadida w/ _id=${nuevaMaquina._id}`)),
      catchError(this.handleError<Maquina>('addHeroe')) // Manejo de errores
    );
  }

  // ==========================================
  // MÉTODO: ELIMINAR UNA MÁQUINA (DELETE)
  // ==========================================
  // Parámetro: maquina = puede ser string (ID) u objeto Maquina
  // DELETE: elimina el recurso del servidor
  deleteMaquina(maquina: Maquina | string): Observable<Maquina> {
    // Extrae el ID: si es string usa directamente, si es objeto extrae su _id
    const _id = typeof maquina === 'string' ? maquina : maquina._id;
    // Construye la URL: http://localhost:4000/maquinas/{_id}
    const url = `${this.apiRestUrl}/${_id}`;

    // Realiza DELETE a la URL con headers
    return this.http.delete<Maquina>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Maquina borrada id=${_id}`)), // Log de éxito
      catchError(this.handleError<Maquina>('deleteMaquina')) // Manejo de errores
    );
  }

}


