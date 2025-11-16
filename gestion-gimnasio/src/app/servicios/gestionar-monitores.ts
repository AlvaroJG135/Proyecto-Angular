import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LISTAMONITORES } from '../lista-monitores';
import { Monitor } from '../monitor';


@Injectable({
  providedIn: 'root',
})

export class GestionarMonitores {

  private serviceUrl = '/monitores.json';

  constructor(private http: HttpClient) { }
  getMonitor(id: number): Observable<Monitor | undefined> {
    const monitor = LISTAMONITORES.find(monitor => monitor.id === id);
    return of(monitor);
  }

  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.serviceUrl);
  }


}