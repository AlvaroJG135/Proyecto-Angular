import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../servicios/carrito.service';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  carrito$: any;

  constructor(private carritoService: CarritoService, private gestionarUsuarios: GestionarUsuarios) {
    this.carrito$ = this.carritoService.carrito;
  }

  get cantidad() {
    return this.carritoService.cantidad();
  }

  esAdmin = () => this.gestionarUsuarios.esAdmin();

  eliminar(clase: any) {
    this.carritoService.removeClase(clase);
  }

  apuntarse() {
    const carrito = this.carritoService.carrito();
    if (carrito.length === 0) {
      alert('Seleccione al menos una clase para apuntarse.');
      return;
    }
    const nombres = carrito.map(c => `${c.nombre} (${c.dia} ${c.hora})`).join(', ');
    this.carritoService.reservarClases();
    alert(`Te has apuntado a: ${nombres}`);
  }

  claseReservada(clase: any): boolean {
    return this.carritoService.reservadas().some((c: any) => c.id === clase.id);
  }
}
