import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LISTAMAQUINAS } from '../lista-maquinas';
import { Maquina } from '../maquina';


@Injectable({
  providedIn: 'root',
})

export class GestionarMaquinas {

  private serviceUrl = '/maquinas.json';
  private apiRestUrl = 'http://localhost:4000/maquinas';  // en producción /heroes
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(this.apiRestUrl).pipe(
      tap(_ => console.log('fetched maquinas')),
      catchError(this.handleError<Maquina[]>('getMaquinas', []))
    );
  }

  getMaquina(id: number): Observable<Maquina | undefined> {
    //const maquina = LISTAMAQUINAS.find(maquina => maquina.id === id);
    return this.http.get<Maquina>(this.apiRestUrl + '/' + id).pipe(
      tap(_ => console.log('fetched maquina')),
      catchError(this.handleError<Maquina>('getMaquina'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  actualizarMaquina(maquina: Maquina): Observable<any> {
    return this.http.put(this.apiRestUrl, maquina, this.httpOptions).pipe(
      tap(_ => console.log(`Maquina actualizada id=${maquina.id}`)),
      catchError(this.handleError<any>('actualizarMaquina'))
    );
  }

  addMaquina(maquina: Maquina): Observable<Maquina> {
    return this.http.post<Maquina>(this.apiRestUrl, maquina, this.httpOptions).pipe(
      tap((nuevaMaquina: Maquina) => console.log(`Maquina añadida w/ id=${nuevaMaquina.id}`)),
      catchError(this.handleError<Maquina>('addHeroe'))
    );
  }

  deleteMaquina(maquina: Maquina | number): Observable<Maquina> {
    const id = typeof maquina === 'number' ? maquina : maquina.id;
    const url = `${this.apiRestUrl}/${id}`;

    return this.http.delete<Maquina>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Maquina borrada id=${id}`)),
      catchError(this.handleError<Maquina>('deleteMaquina'))
    );
  }


}

