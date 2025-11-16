import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Monitor } from '../monitor';
import { GestionarMonitores } from '../servicios/gestionar-monitores';


@Component({
  selector: 'app-monitor-detalle',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './monitor-detalle.html',
  styleUrl: './monitor-detalle.css',
})
export class MonitorDetalle {

  constructor(
    private route: ActivatedRoute,
    private gestionarMonitores: GestionarMonitores,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getMonitor());
  }

  getMonitor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gestionarMonitores.getMonitor(id)
      .subscribe(monitor => this.monitor = monitor);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.monitor) {
      this.gestionarMonitores.actualizarMonitor(this.monitor)
        .subscribe(() => this.goBack());
    }
  }

  @Input() monitor?: Monitor;
}
