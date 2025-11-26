
import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs'; 
import { catchError, tap } from 'rxjs/operators'; 
import { Maquina } from '../maquina'; 

//Hace que la clase sea inyectable en otros componentes
@Injectable({
  providedIn: 'root',
})


export class GestionarMaquinas {

  //private serviceUrl = '/maquinas.json'; // URL local (NO se usa actualmente)
  // URL base del API para maquinas
  private apiRestUrl = 'http://localhost:4000/maquinas';
  
  // Configuración de headers HTTP (especifica que enviaremos JSON)
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //Obtiene la lista de todas las máquinas
  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(this.apiRestUrl).pipe(
      tap(_ => console.log('fetched maquinas')),
      catchError(this.handleError<Maquina[]>('getMaquinas', []))
    );
  }

  //Obtiene una máquina específica por su _id
  getMaquina(_id: string): Observable<Maquina | undefined> {
    // Realiza GET a: http://localhost:4000/maquinas/{_id}
    return this.http.get<Maquina>(this.apiRestUrl + '/' + _id).pipe(
      tap(_ => console.log('fetched maquina')), // Log cuando se obtiene
      catchError(this.handleError<Maquina>('getMaquina')) // Manejo de errores
    );
  }
  //función privada que maneja errores en peticiones HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    // Devuelve una función que captura el error
    return (error: any): Observable<T> => {
      //registra el error en la consola 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      // devuelve el valor por defecto para que la app no se rompa
      return of(result as T);
    };
  }

  //actualiza una máquina existente
  actualizarMaquina(maquina: Maquina): Observable<any> {
    // realia petición HTTP PUT a: http://localhost:4000/maquinas/{_id}
    return this.http.put(this.apiRestUrl + '/' + maquina._id,maquina,this.httpOptions).pipe(
      tap(_ => console.log(`Maquina actualizada _id=${maquina._id}`)),
      catchError(this.handleError<any>('actualizarMaquina'))
    );
  }

  //crea una nueva máquina
  addMaquina(maquina: Maquina): Observable<Maquina> {
    // realiza petición HTTP POST a: http://localhost:4000/maquinas
    return this.http.post<Maquina>(this.apiRestUrl,maquina,this.httpOptions).pipe(
      tap((nuevaMaquina: Maquina) => console.log(`Maquina añadida w/ _id=${nuevaMaquina._id}`)),
      catchError(this.handleError<Maquina>('addHeroe'))
    );
  }

  //elimina una máquina por su _id (acepta string o objeto Maquina)
  deleteMaquina(maquina: Maquina | string): Observable<Maquina> {
    // Extrae el ID: si es string usa directamente, si es objeto extrae su _id
    let _id;
    if (typeof maquina === 'string') {
      _id = maquina;
    } else {
      _id = maquina._id;
    }
    // Construye la URL: http://localhost:4000/maquinas/{_id}
    const url = `${this.apiRestUrl}/${_id}`;

    //realiza peticion HTTP DELETE a: http://localhost:4000/maquinas/{_id}
    return this.http.delete<Maquina>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Maquina borrada id=${_id}`)),
      catchError(this.handleError<Maquina>('deleteMaquina'))
    );
  }

}


