import { Component } from '@angular/core';
import { Maquina } from '../maquina';
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: [ './dashboard.css' ]
})
export class Dashboard {
  maquinas: Maquina[] = [];

  constructor(private gestionarMaquinasService: GestionarMaquinas) { }

  ngOnInit() {
    this.getMaquinas();
  }

  getMaquinas(): void {
    this.gestionarMaquinasService.getMaquinas()
      .subscribe(maquinas => this.maquinas = maquinas.slice(1, 5));
  }
}
