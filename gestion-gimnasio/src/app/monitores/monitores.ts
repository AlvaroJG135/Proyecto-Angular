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

  onSelect(monitor: Monitor): void {
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.nuevoMonitor = { ...monitor };
    this.selectedMonitor = monitor;
  }

  getMonitores(): void {
    this.gestionarMonitores.getMonitores()
      .subscribe(monitores => this.monitores = monitores);
  }

  ngOnInit() {
    this.getMonitores();
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.nuevoMonitor = {};
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.nuevoMonitor = {};
    this.selectedMonitor = undefined;
    this.modoEdicion = false;
  }
  modificarMonitor(): void {
    if (!this.selectedMonitor || !this.nuevoMonitor.nombre) { return; }
    const monitorEditado = {
      ...this.selectedMonitor,
      nombre: this.nuevoMonitor.nombre?.trim() || '',
      fechaNacimiento: this.nuevoMonitor.fechaNacimiento || '',
      salario: this.nuevoMonitor.salario || 0,
      turno: this.nuevoMonitor.turno || ''
    } as Monitor;
    this.gestionarMonitores.actualizarMonitor(monitorEditado)
      .subscribe({
        next: m => {
          if (m && m._id) {
            const idx = this.monitores.findIndex(mon => mon._id === m._id);
            if (idx > -1) this.monitores[idx] = m;
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
    this.gestionarMonitores.addMonitor(monitor)
      .subscribe({
        next: m => {
          if (m && m._id) {
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

  delete(monitor: Monitor): void {
    this.monitores = this.monitores.filter(h => h !== monitor);
    this.gestionarMonitores.deleteMonitor(monitor._id!).subscribe();
  }

}

export class CardOverviewExample { }
