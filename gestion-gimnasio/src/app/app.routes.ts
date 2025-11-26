import { Login } from './login/login';
import { Routes } from '@angular/router';
import { Maquinas } from './maquinas/maquinas';
import { Monitores } from './monitores/monitores';
import { Dashboard }   from './dashboard/dashboard';
import { MaquinaDetalle }  from './maquina-detalle/maquina-detalle';
import { Registro } from './registro/registro';
import { authGuard } from './guard-auth';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, //canActivate: [authGuard],
    { path: 'maquinas', component: Maquinas, canActivate: [authGuard]},
    { path: 'monitores', component: Monitores, canActivate: [authGuard]},
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    { path: 'registro', component: Registro },
    { path: 'login', component: Login },
    { path: 'detalle/:id', component: MaquinaDetalle, canActivate: [authGuard]},
];

