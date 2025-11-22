import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Maquina } from '../maquina';
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';


@Component({
  selector: 'app-maquina-detalle',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './maquina-detalle.html',
  styleUrl: './maquina-detalle.css',
})
export class MaquinaDetalle {

  constructor(
    private route: ActivatedRoute,
    private gestionarMaquinas: GestionarMaquinas,
    private location: Location
  ) { }
  // Solo carga si hay un ID en la ruta
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const _id = params['id'];
      if (_id) {
        this.getMaquina(_id);
      }
    });
  }

  getMaquina(_id: string): void {
    this.gestionarMaquinas.getMaquina(_id)
      .subscribe(maquina => this.maquina = maquina);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.maquina) {
      this.gestionarMaquinas.actualizarMaquina(this.maquina)
        .subscribe(() => this.goBack());
    }
  }

  @Input() maquina?: Maquina;
}
