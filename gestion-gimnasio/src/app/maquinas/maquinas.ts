import { Component } from '@angular/core';
import { Maquina } from '../maquina';
import { FormsModule } from '@angular/forms';
import { MaquinaDetalle } from "../maquina-detalle/maquina-detalle";
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [FormsModule, MaquinaDetalle, RouterLink],
  templateUrl: './maquinas.html',
  styleUrls: ['./maquinas.css']
})
export class Maquinas {

  maquinas: Maquina[];
  selectedMaquina?: Maquina;

  constructor(private gestionarMaquinas: GestionarMaquinas) {
    this.maquinas = [];
  }

  onSelect(maquina: Maquina): void {
    this.selectedMaquina = maquina
  }

  getMaquinas(): void {
    this.gestionarMaquinas.getMaquinas().subscribe(maquinas => this.maquinas = maquinas);
  }

  ngOnInit() {
    this.getMaquinas();
  }

  add(modelo: string): void {
    modelo = modelo.trim();
    if (!modelo) { return; }
    this.gestionarMaquinas.addMaquina({ modelo } as Maquina)
      .subscribe(maquina => {
        this.maquinas.push(maquina);
      });
  }

  delete(maquina: Maquina): void {
    this.maquinas = this.maquinas.filter(h => h !== maquina);
    this.gestionarMaquinas.deleteMaquina(maquina).subscribe();
  }

}
