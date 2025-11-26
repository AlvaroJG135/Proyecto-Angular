import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monitor } from '../monitor';
import { FormsModule } from '@angular/forms';
import { GestionarMonitores } from '../servicios/gestionar-monitores';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Filtro } from '../filtro/filtro';

@Component({
  //selector para usar el componente en HTML
  selector: 'app-monitores,card-overview-example',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule, Filtro],
  templateUrl: './monitores.html',
  styleUrls: ['./monitores.css'],
})

export class Monitores {
  modoEdicion: boolean = false;
  //funcion para optimizar el ngFor si non tiene _id utiliza el index
  trackByMonitorId(index: number, monitor: Monitor): string {
    return monitor._id ?? index.toString();
  }

  monitores: Monitor[] = [];
  filtroTexto: string = '';
  //solo puede ordenar por estos campos y por defecto es nombre
  ordenarPor: 'nombre' | 'salario' | 'turno' = 'nombre';
  //dolo puede ordernar por estas direcciones y por defecto es asc
  ordenar: 'asc' | 'desc' = 'asc';

  get filteredMonitores(): Monitor[] {
    let resultado = this.monitores;

    // Filtrado
    if (this.filtroTexto) {
      const txt = this.filtroTexto.toLowerCase();
      resultado = resultado.filter(m => (m.nombre || '').toLowerCase().includes(txt));

    }

    // se ordena por campo y direccion
    resultado = [...resultado].sort((a, b) => {
      //se coge los valores a comparar
      let valA: any = a[this.ordenarPor];
      let valB: any = b[this.ordenarPor];

      // se combierten a minusculas si son strings
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      //comprueba cual de los dos valores es mayor 
      let comparacion = 0;
      if (valA < valB) {
        comparacion = -1;
      } else if (valA > valB) {
        comparacion = 1;
      }

      // si es ascendente devuelve comparacion, si no el negativo
      if (this.ordenar === 'asc') {
        return comparacion;
      } else {
        return -comparacion;
      }
    });

    return resultado;
  }
  selectedMonitor?: Monitor;
  mostrarFormulario: boolean = false;
  nuevoMonitor: Partial<Monitor> = {};

  // Inyección de dependencias: servicio que maneja llamadas HTTP
  constructor(private gestionarMonitores: GestionarMonitores) { }

  onFilterChange(valor: string) {
    this.filtroTexto = valor || '';
  }

  onOrdenChange(campo: 'nombre' | 'salario' | 'turno') {
    this.ordenarPor = campo;
  }

  onDireccionChange(direccion: 'asc' | 'desc') {
    this.ordenar = direccion;
  }
  // Se llama cuando el usuario selecciona una fila para editar
  onSelect(monitor: Monitor): void {
    this.modoEdicion = true;              // Activamos modo edición
    this.mostrarFormulario = true;        // Mostramos el formulario 
    this.nuevoMonitor = { ...monitor };   // Clonamos el monitor seleccionado en el formulario 
    this.selectedMonitor = monitor;       // Guardamos referencia al monitor original
  }
  //obtiene la lista de monitores desde el backend
  getMonitores(): void {
    this.gestionarMonitores.getMonitores()
      .subscribe(monitores => this.monitores = monitores);
  }
  //pedimos los monitores
  ngOnInit() {
    this.getMonitores();
  }
  //abrir formulario
  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.nuevoMonitor = {};
  }
  //cerrar formulario
  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.nuevoMonitor = {};
    this.selectedMonitor = undefined;
    this.modoEdicion = false;
  }
  //Modificar un monitor existente
  modificarMonitor(): void {
    // Validación mínima: debe existir un monitor seleccionado y debe haber modelo en formulario
    if (!this.selectedMonitor || !this.nuevoMonitor.nombre) { return; }
    //crea el objeto que enviaremos al backend
    const monitorEditado = {
      //copia los datos actuales del monitor seleccionado
      ...this.selectedMonitor,
      nombre: this.nuevoMonitor.nombre?.trim() || '',
      fechaNacimiento: this.nuevoMonitor.fechaNacimiento || '',
      salario: this.nuevoMonitor.salario || 0,
      turno: this.nuevoMonitor.turno || ''
    } as Monitor;

     // Llamada al servicio para actualizar
    this.gestionarMonitores.actualizarMonitor(monitorEditado).subscribe({
        next: m => {
          //comprueba si el monitor modificado tiene _id y actualiza la lista
          if (m && m._id) {
            //busca el monitor en la lista por su _id
            const id_monitor = this.monitores.findIndex(mon => mon._id === m._id);
            //si lo encuentra actualiza sus datos
            if (id_monitor > -1) this.monitores[id_monitor] = m;
          }
          this.cancelarFormulario();
        },
        error: err => {
          console.error('Error al modificar monitor:', err);
        }
      });
  }

  guardarMonitor(): void {
    const monitor = {
      nombre: this.nuevoMonitor.nombre?.trim() || '',
      fechaNacimiento: this.nuevoMonitor.fechaNacimiento || '',
      salario: this.nuevoMonitor.salario || 0,
      turno: this.nuevoMonitor.turno || ''
    } as Monitor;
    if (!monitor.nombre) { return; }
    this.gestionarMonitores.addMonitor(monitor).subscribe({
        next: m => {
          //comprueba si el monitor modificado tiene _id y actualiza la lista
          if (m && m._id) {
            //añade el nuevo monitor a la lista
            this.monitores.push(m);
          }
          this.mostrarFormulario = false;
          this.nuevoMonitor = {};
        },
        error: err => {
          console.error('Error al añadir monitor:', err);
        }
      });
  }
  //elimina un monitor, lo filtra de la lista y llama al servicio para eliminarlo del backend
  delete(monitor: Monitor): void {
     // Eliminamos del array local
    this.monitores = this.monitores.filter(h => h !== monitor);
    // Llamada al servicio para borrar en backend
    this.gestionarMonitores.deleteMonitor(monitor._id!).subscribe();
  }

}

export class CardOverviewExample { }
