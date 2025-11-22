import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Monitor } from '../monitor';
import { FormsModule } from '@angular/forms';
import { GestionarMonitores } from '../servicios/gestionar-monitores';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-monitores,card-overview-example',
  standalone: true,
  imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './monitores.html',
  styleUrls: ['./monitores.css'],
})
export class Monitores {
  trackByMonitorId(index: number, monitor: Monitor): string {
    return monitor._id ?? index.toString();
  }

  monitores: Monitor[] = [];
  selectedMonitor?: Monitor;
  mostrarFormulario: boolean = false;
  nuevoMonitor: Partial<Monitor> = {};

  constructor(private gestionarMonitores: GestionarMonitores) {}

  onSelect(monitor: Monitor): void {
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

export class CardOverviewExample {}
