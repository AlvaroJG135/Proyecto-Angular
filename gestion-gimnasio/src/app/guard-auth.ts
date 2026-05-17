import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GestionarUsuarios } from './servicios/gestionar-usuarios';

export const authGuard: CanActivateFn = () => {
  const auth = inject(GestionarUsuarios);
  const router = inject(Router);

  const authenticated = auth.estaAutenticado() || !!localStorage.getItem('usuario');
  if (authenticated) {
    return true;
  }

  // Si no está autenticado, redirigir al login
  console.log('authGuard: no autenticado, redirigiendo a /login');
  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(GestionarUsuarios);
  const router = inject(Router);

  if (auth.esAdmin()) {
    return true;
  }

  // Si no es administrador, redirige a dashboard (o login) y muestra un mensaje
  console.log('adminGuard: acceso denegado, redirigiendo a /dashboard');
  router.navigate(['/dashboard']);
  return false;
};

export const usuarioGuard: CanActivateFn = () => {
  const auth = inject(GestionarUsuarios);
  const router = inject(Router);

  if (!auth.esAdmin()) {
    return true;
  }

  console.log('usuarioGuard: admin no puede acceder, redirigiendo a /dashboard');
  router.navigate(['/dashboard']);
  return false;
};
