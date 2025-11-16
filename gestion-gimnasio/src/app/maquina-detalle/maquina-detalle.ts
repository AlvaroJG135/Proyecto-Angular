import { UpperCasePipe } from '@angular/common';
import { Component,  Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Maquina } from '../maquina';
import { GestionarMaquinas }  from '../servicios/gestionar-maquinas';


@Component({
  selector: 'app-maquina-detalle',
  imports:[FormsModule,UpperCasePipe],
  templateUrl: './maquina-detalle.html',
  styleUrl: './maquina-detalle.css',
})
export class MaquinaDetalle {

  constructor(
    private route: ActivatedRoute,
    private gestionarMaquinas: GestionarMaquinas,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe( params => this.getMaquina());
  }

  getMaquina(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gestionarMaquinas.getMaquina(id)
      .subscribe(maquina => this.maquina = maquina);
  }

  goBack(): void {
    this.location.back();
  }
  
  @Input() maquina?: Maquina;
}
