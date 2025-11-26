import { Component } from '@angular/core';
import { Maquina } from '../maquina';
import { Monitor } from '../monitor';
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
import { GestionarMonitores } from '../servicios/gestionar-monitores';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: [ './dashboard.css' ]
})
export class Dashboard {
  maquinas: Maquina[] = [];
  maquinasTop: Maquina[] = [];
  monitoresTop: Monitor[] = [];

  constructor(private gestionarMaquinasService: GestionarMaquinas, private gestionarMonitores: GestionarMonitores) { }

  ngOnInit() {
    this.getMaquinas();
    this.getMonitores();
  }

  getMaquinas(): void {
    this.gestionarMaquinasService.getMaquinas()
      .subscribe(maquinas => {
        this.maquinas = maquinas || [];
        this.maquinasTop = [...this.maquinas]
          .sort((a, b) => (b.precio || 0) - (a.precio || 0))
          .slice(0, 3);
      });
  }

  getMonitores(): void {
    this.gestionarMonitores.getMonitores()
      .subscribe(monitores => {
        const lista = monitores || [];
        this.monitoresTop = lista.slice(0, 4);
      });
  }
}
