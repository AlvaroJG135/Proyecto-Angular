import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Maquina } from '../maquina';
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';


@Component({
  //selector para usar el componente en HTML
  selector: 'app-maquina-detalle',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './maquina-detalle.html',
  styleUrl: './maquina-detalle.css',
})


// Muestra el detalle completo de una máquina y permite editarla
// Se accede a través de ruta: /detalle/:id
export class MaquinaDetalle {

  constructor(
    private route: ActivatedRoute, // Para obtener el parámetro 'id' de la ruta
    private gestionarMaquinas: GestionarMaquinas, // Servicio HTTP para máquinas
    private location: Location // Para navegar atrás
  ) { }

  //Se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Se suscribe a los cambios de parámetros de la ruta
    // params es un Observable que emite cada vez que cambian los parámetros
    this.route.params.subscribe(params => {
      const _id = params['id']; // Extrae el parámetro 'id' de la URL
      
      // Solo carga los datos si hay un ID en la ruta
      if (_id) {
        this.getMaquina(_id); // Obtiene los datos de la máquina
      }
    });
  }

  getMaquina(_id: string): void {
    // Realiza petición HTTP GET a: http://localhost:4000/maquinas/{_id}
    this.gestionarMaquinas.getMaquina(_id)
      .subscribe(maquina => {
        // Cuando llega la respuesta, almacena la máquina
        this.maquina = maquina;
      });
  }

  // Vuelve a la página anterior
  goBack(): void {
    this.location.back();
  }

  @Input() maquina?: Maquina; // Máquina actual que se visualiza/edita
}

