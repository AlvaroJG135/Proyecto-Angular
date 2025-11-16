import { Component} from '@angular/core';
import { Maquina } from '../maquina';
import { FormsModule } from '@angular/forms';
import { MaquinaDetalle } from "../maquina-detalle/maquina-detalle";
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maquinas',
  standalone : true,
  imports: [FormsModule, MaquinaDetalle, RouterLink],
  templateUrl: './maquinas.html',
  styleUrls: ['./maquinas.css']
})
export class Maquinas {

  maquinas?: Maquina[];
  selectedMaquina? : Maquina;
  
  constructor(private maquinaServicio: GestionarMaquinas) { 
    this.maquinas = [];
  }

  onSelect(maquina: Maquina): void{
    this.selectedMaquina = maquina
  }

  getMaquinas(): void {
    this.maquinaServicio.getMaquinas()
        .subscribe(maquinas => this.maquinas = maquinas);
  }
  ngOnInit() {
    this.getMaquinas();
  }
}
