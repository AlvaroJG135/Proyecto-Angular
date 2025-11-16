import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LISTAMAQUINAS } from '../lista-maquinas';
import { Maquina } from '../maquina';


@Injectable({
  providedIn: 'root',
})

export class GestionarMaquinas {

  private serviceUrl = '/maquinas.json';

  constructor(private http: HttpClient) { }
  getMaquina(id: number): Observable<Maquina | undefined> {
    const maquina = LISTAMAQUINAS.find(maquina => maquina.id === id);
    return of(maquina);
  }

  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(this.serviceUrl);
  }

}

