import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { GestionarUsuarios } from './servicios/gestionar-usuarios';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const auth = inject(GestionarUsuarios);
  const router = inject(Router)

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        // Si estamos no autorizados, hacemos logout o redirección
        auth.logout().subscribe({
          next: () => {
            router.navigate(['/login']);
          }
        });
      }
      return throwError(() => err);
    })
  );
}
