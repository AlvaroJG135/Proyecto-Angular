import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Monitor } from '../monitor';

//Hace que la clase sea inyectable en otros componentes
@Injectable({
  providedIn: 'root',
})

// Servicio HTTP para gestionar la comunicación con el backend
export class GestionarMonitores {
  // URL base del API para monitores
  private serviceUrl = 'http://localhost:4000/monitores';
  // Configuración de headers HTTP (especifica que enviaremos JSON)
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Obtiene la lista de todos los monitores
  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.serviceUrl).pipe(
      tap(_ => console.log('fetched monitor')),
      catchError(this.handleError<Monitor[]>('getMonitores', []))
    );
  }

  // Obtiene un monitor específico por su _id
  getMonitor(_id: string): Observable<Monitor | undefined> {
    // Realiza GET a: http://localhost:4000/monitores/{_id}
    return this.http.get<Monitor>(this.serviceUrl + '/' + _id).pipe(
      tap(_ => console.log('fetched monitor')),
      catchError(this.handleError<Monitor>('getMonitor'))
    );
  }

  // Función privada que maneja errores en peticiones HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    // Devuelve una función que recibe el error
    return (error: any): Observable<T> => {
      // Registra el error en la consola
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Devuelve el valor por defecto para que la app no se rompa
      return of(result as T);
    };
  }

  // Actualiza un monitor existente
  actualizarMonitor(monitor: Monitor): Observable<any> {
    // Realiza petición HTTP PUT a: http://localhost:4000/monitores/{_id}
    return this.http.put(this.serviceUrl + '/' + monitor._id, monitor, this.httpOptions).pipe(
      tap(_ => console.log(`Monitor actualizado _id=${monitor._id}`)),
      catchError(this.handleError<any>('actualizarMonitor'))
    );
  }

  // Crea un nuevo monitor
  addMonitor(monitor: Monitor): Observable<Monitor> {
    // Realiza petición HTTP POST a: http://localhost:4000/monitores
    return this.http.post<Monitor>(this.serviceUrl, monitor, this.httpOptions).pipe(
      tap((nuevoMonitor: Monitor) => console.log(`Monitor añadido w/ _id=${nuevoMonitor._id}`)),
      catchError(this.handleError<Monitor>('addMonitor'))
    );
  }


  // Elimina un monitor por su _id (acepta string o objeto Monitor)
  deleteMonitor(monitor: Monitor | string): Observable<Monitor> {
    // Si es un string se pone como _id. si es un objeto se extrae el _id
    let _id;
    if (typeof monitor === 'string') {
      _id = monitor;
    } else {
      _id = monitor._id;
    }
    const url = `${this.serviceUrl}/${_id}`;

    // Realiza petición HTTP DELETE a: http://localhost:4000/monitores/{_id}
    return this.http.delete<Monitor>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Monitor borrado _id=${_id}`)),
      catchError(this.handleError<Monitor>('deleteMonitor'))
    );
  }
}
