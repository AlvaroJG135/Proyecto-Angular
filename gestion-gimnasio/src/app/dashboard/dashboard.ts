import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Maquina } from '../maquina';
import { Monitor } from '../monitor';
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
import { GestionarMonitores } from '../servicios/gestionar-monitores';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';
import { CarritoService } from '../servicios/carrito.service';
import { RouterLink } from '@angular/router';
import { Clase } from '../clase';

@Component({
  //selector para usar el componente en HTML
  selector: 'app-dashboard', 
  standalone: true,
  imports: [CommonModule, RouterLink, NgxChartsModule],
  templateUrl: './dashboard.html',
  styleUrls: [ './dashboard.css' ]
})

export class Dashboard implements OnInit {

  maquinas: Maquina[] = [];
  monitores: Monitor[] = [];
  maquinasTop: Maquina[] = [];
  monitoresTop: Monitor[] = [];
  esAdmin = false;

  // Gráfico de barras - Salarios monitores
  salarioData: any[] = [];

  // Gráfico pie - Marcas máquinas
  marcasData: any[] = [];

  // Opciones visuales
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Monitor';
  yAxisLabel = 'Salario (€)';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#4e79a7', '#f28e2b']
  };

  clasesDisponibles: Clase[] = [
    { id: 'c1', nombre: 'Pilates', dia: 'Lunes', hora: '09:00 - 10:00', monitor: '' },
    { id: 'c2', nombre: 'Spinning', dia: 'Martes', hora: '10:00 - 11:00', monitor: '' },
    { id: 'c3', nombre: 'Zumba', dia: 'Miércoles', hora: '11:00 - 12:00', monitor: '' },
    { id: 'c4', nombre: 'CrossFit', dia: 'Jueves', hora: '18:00 - 19:00', monitor: '' },
    { id: 'c5', nombre: 'Yoga', dia: 'Viernes', hora: '19:00 - 20:00', monitor: '' }
  ];

  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  //metodo contructor para poder usar la lista de maquinas y monitores
  constructor(
    private gestionarMaquinasService: GestionarMaquinas,
    private gestionarMonitores: GestionarMonitores,
    public gestionarUsuarios: GestionarUsuarios,
    public carritoService: CarritoService
  ) { }

  //se ejecuta una sola vez cuando el componente se inicializa
  ngOnInit() {
    this.esAdmin = this.gestionarUsuarios.esAdmin();
      this.cargarSalarios();
      this.cargarMarcas();
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
        this.monitoresTop = this.monitores.slice(0, 4); // Toma solo los primeros 4 monitores
        this.asignarMonitoresAClases();
      });
  }

  cargarSalarios(): void {
    this.gestionarMonitores.getMonitores().subscribe((monitores: any[]) => {
      this.salarioData = monitores.map(m => ({
        name: m.nombre,
        value: m.salario
      }));
    });
  }

  cargarMarcas(): void {
    this.gestionarMaquinasService.getMaquinas().subscribe((maquinas: any[]) => {
      const conteo: { [marca: string]: number } = {};

      maquinas.forEach(m => {
        conteo[m.marca] = (conteo[m.marca] || 0) + 1;
      });

      this.marcasData = Object.entries(conteo).map(([marca, cantidad]) => ({
        name: marca,
        value: cantidad
      }));
    });
  }

  private asignarMonitoresAClases(): void {
    // separar monitores por turno
    const monitoresManana = this.monitores.filter(m => m.turno?.toLowerCase() === 'mañana' || m.turno?.toLowerCase() === 'manana');
    const monitoresTarde = this.monitores.filter(m => m.turno?.toLowerCase() === 'tarde');

    // efecto: rota los monitores de mañana y tarde si hay varios
    const monitorManana = monitoresManana.length ? monitoresManana[0].nombre : 'Monitor mañana';
    const monitorTarde = monitoresTarde.length ? monitoresTarde[0].nombre : 'Monitor tarde';

    this.clasesDisponibles = this.clasesDisponibles.map(clase => {
      const horaInicio = Number(clase.hora.split(' - ')[0].split(':')[0]);
      const esManana = horaInicio < 13;
      return {
        ...clase,
        monitor: esManana ? monitorManana : monitorTarde
      };
    });
  }

  /** Añadir o quitar clase del carrito */
  toggleClaseEnCarrito(clase: Clase): void {
    if (this.carritoService.enReservada(clase)) {
      return;
    }

    if (this.carritoService.enCarrito(clase)) {
      this.carritoService.removeClase(clase);
    } else {
      this.carritoService.addClase(clase);
    }
  }

  /** Comprueba si clase está en carrito */
  enCarrito(clase: Clase): boolean {
    return this.carritoService.enCarrito(clase);
  }

  /** Comprueba si clase ya está reservada */
  enReservada(clase: Clase): boolean {
    return this.carritoService.enReservada(clase);
  }
}

