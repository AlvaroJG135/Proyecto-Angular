import { Routes } from '@angular/router';
import { Maquinas } from './maquinas/maquinas';
import { Monitores } from './monitores/monitores';
import { DashboardMaquina }   from './dashboard-maquina/dashboard-maquina';
import { MaquinaDetalle }  from './maquina-detalle/maquina-detalle';
import { MonitorDetalle }  from './monitor-detalle/monitor-detalle';

export const routes: Routes = [
    { path: 'maquinas', component: Maquinas },
    { path: 'monitores', component: Monitores },
    { path: 'dashboard-maquina', component: DashboardMaquina},
    { path: 'detalle/:id', component: MaquinaDetalle },
    { path: 'detalle/:id', component: MonitorDetalle },
];

