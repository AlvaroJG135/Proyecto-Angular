import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LISTAMONITORES } from '../lista-monitores';
import { Monitor } from '../monitor';


@Injectable({
  providedIn: 'root',
})

export class GestionarMonitores {

  //private serviceUrl = '/monitores.json';
  private serviceUrl = 'http://localhost:4000/monitores';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.serviceUrl).pipe(
      tap(_ => console.log('fetched monitor')),
      catchError(this.handleError<Monitor[]>('getMonitores', []))
    );
  }

  getMonitor(_id: string): Observable<Monitor | undefined> {
    return this.http.get<Monitor>(this.serviceUrl + '/' + _id).pipe(
      tap(_ => console.log('fetched monitor')),
      catchError(this.handleError<Monitor>('getMonitor'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  actualizarMonitor(monitor: Monitor): Observable<any> {
    return this.http.put(this.serviceUrl + '/' + monitor._id, monitor, this.httpOptions).pipe(
      tap(_ => console.log(`Monitor actualizado _id=${monitor._id}`)),
      catchError(this.handleError<any>('actualizarMonitor'))
    );
  }

  addMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>(this.serviceUrl, monitor, this.httpOptions).pipe(
      tap((nuevoMonitor: Monitor) => console.log(`Monitor añadido w/ _id=${nuevoMonitor._id}`)),
      catchError(this.handleError<Monitor>('addMonitor'))
    );
  }
  
  deleteMonitor(monitor: Monitor | string): Observable<Monitor> {
    const _id = typeof monitor === 'string' ? monitor : monitor._id;
    const url = `${this.serviceUrl}/${_id}`;

    return this.http.delete<Monitor>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Monitor borrado _id=${_id}`)),
      catchError(this.handleError<Monitor>('deleteMonitor'))
    );
  }
}
