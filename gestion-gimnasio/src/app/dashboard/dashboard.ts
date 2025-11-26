import { Component } from '@angular/core';
import { Maquina } from '../maquina';
import { Monitor } from '../monitor';
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
import { GestionarMonitores } from '../servicios/gestionar-monitores';
import { RouterLink } from '@angular/router';

@Component({
  //selector para usar el componente en HTML
  selector: 'app-dashboard', 
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: [ './dashboard.css' ]
})

export class Dashboard {

  maquinas: Maquina[] = [];
  monitores: Monitor[] = [];
  maquinasTop: Maquina[] = [];
  monitoresTop: Monitor[] = [];

  //metodo contructor para poder usar la lista de maquinas y monitores
  constructor(private gestionarMaquinasService: GestionarMaquinas,private gestionarMonitores: GestionarMonitores) { }

  //se ejecuta una sola vez cuando el componente se inicializa
  ngOnInit() {
    this.getMaquinas();
    this.getMonitores();
  }

  //obtener maquinas y calcular top 3
  getMaquinas(): void {
    // Llamada HTTP al servicio para obtener todas las máquinas
    this.gestionarMaquinasService.getMaquinas().subscribe(maquinas => {
        this.maquinas = maquinas || []; // Almacena todas las máquinas o array vacío si null
        
        // Cálculo del TOP 3:
        this.maquinasTop = [...this.maquinas] // Crea UNA COPIA del array (spread operator)
          .sort((a, b) => (b.precio || 0) - (a.precio || 0)) // Ordena por precio DESCENDENTE (mayor a menor)
          .slice(0, 3); // Toma solo los primeros 3 elementos
      });
  }

  //obtener monitores y calcular top 4
  getMonitores(): void {
    // Llamada HTTP al servicio para obtener todos los monitores
    this.gestionarMonitores.getMonitores().subscribe(monitores => {
        this.monitores = monitores || []; // Almacena todos los monitores o array vacío si null
        this.monitoresTop = monitores.slice(0, 4); // Toma solo los primeros 4 monitores
      });
  }
}
