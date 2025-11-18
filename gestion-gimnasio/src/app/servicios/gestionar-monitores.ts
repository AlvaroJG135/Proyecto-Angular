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

  private serviceUrl = '/monitores.json';
  private apiRestUrl = 'http://localhost:/monitores';  // en producción /heroes
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.apiRestUrl).pipe(
      tap(_ => console.log('fetched monitor')),
      catchError(this.handleError<Monitor[]>('getMonitores', []))
    );
  }

  getMonitor(id: number): Observable<Monitor | undefined> {
    //const monitor = LISTAMONITORES.find(monitor => monitor.id === id);
    return this.http.get<Monitor>(this.apiRestUrl + '/' + id).pipe(
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
    return this.http.put(this.apiRestUrl, monitor, this.httpOptions).pipe(
      tap(_ => console.log(`Monitor actualizado id=${monitor.id}`)),
      catchError(this.handleError<any>('actualizarMonitor'))
    );
  }

  addMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>(this.apiRestUrl, monitor, this.httpOptions).pipe(
      tap((nuevoMonitor: Monitor) => console.log(`Monitor añadido w/ id=${nuevoMonitor.id}`)),
      catchError(this.handleError<Monitor>('addMonitor'))
    );
  }
  deleteMonitor(monitor: Monitor | number): Observable<Monitor> {
    const id = typeof monitor === 'number' ? monitor : monitor.id;
    const url = `${this.apiRestUrl}/${id}`;

    return this.http.delete<Monitor>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Monitor borrado id=${id}`)),
      catchError(this.handleError<Monitor>('deleteMonitor'))
    );
  }


}