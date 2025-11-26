import { Login } from './login/login';
import { Routes } from '@angular/router';
import { Maquinas } from './maquinas/maquinas';
import { Monitores } from './monitores/monitores';
import { Dashboard }   from './dashboard/dashboard';
import { MaquinaDetalle }  from './maquina-detalle/maquina-detalle';
import { Registro } from './registro/registro';
import { authGuard } from './guard-auth';

// Define todas las rutas de la aplicación Angular con sus respectivos componentes
// Cada ruta especifica el path, componente asociado 
export const routes: Routes = [
    // Ruta vacía ('') redirige automáticamente a 'dashboard' con pathMatch 'full'
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, //canActivate: [authGuard],
    // Protegida con authGuard: solo usuarios autenticados pueden acceder
    // Ruta: /maquinas
    { path: 'maquinas', component: Maquinas, canActivate: [authGuard]},
    // Protegida con authGuard: solo usuarios autenticados pueden acceder
    // Ruta: /monitores
    { path: 'monitores', component: Monitores, canActivate: [authGuard]},
    // Protegida con authGuard: solo usuarios autenticados pueden acceder
    // Ruta: /dashboard
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    // SIN protección: accesible para usuarios no autenticados
    // Ruta: /registro
    { path: 'registro', component: Registro },
    // SIN protección: accesible para usuarios no autenticados
    // Ruta: /login
    { path: 'login', component: Login },
    // Protegida con authGuard: solo usuarios autenticados pueden acceder
    // Parámetro ':id' contiene el ID de la máquina a mostrar
    // Ruta: /detalle/:id
    { path: 'detalle/:id', component: MaquinaDetalle, canActivate: [authGuard]},
];

