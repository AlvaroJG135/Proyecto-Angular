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

  getMaquina(_id: string): Observable<Maquina | undefined> {
    //const maquina = LISTAMAQUINAS.find(maquina => maquina.id === id);
    return this.http.get<Maquina>(this.apiRestUrl + '/' + _id).pipe(
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
    return this.http.put(this.apiRestUrl + '/' + maquina._id, maquina, this.httpOptions).pipe(
      tap(_ => console.log(`Maquina actualizada _id=${maquina._id}`)),
      catchError(this.handleError<any>('actualizarMaquina'))
    );
  }

  addMaquina(maquina: Maquina): Observable<Maquina> {
    return this.http.post<Maquina>(this.apiRestUrl, maquina, this.httpOptions).pipe(
      tap((nuevaMaquina: Maquina) => console.log(`Maquina añadida w/ _id=${nuevaMaquina._id}`)),
      catchError(this.handleError<Maquina>('addHeroe'))
    );
  }

  deleteMaquina(maquina: Maquina | string): Observable<Maquina> {
    const _id = typeof maquina === 'string' ? maquina : maquina._id;
    const url = `${this.apiRestUrl}/${_id}`;

    return this.http.delete<Maquina>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Maquina borrada id=${_id}`)),
      catchError(this.handleError<Maquina>('deleteMaquina'))
    );
  }


}

