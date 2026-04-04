import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  //selector para usar el componente en HTML
  selector: 'app-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})

export class Menu {
  private router = inject(Router) as Router; // Servicio de autenticación HTTP
  private auth = inject(GestionarUsuarios); // Servicio de navegacion
  public carritoService = inject(CarritoService);

  estaAutenticado = this.auth.estaAutenticado;
  esAdmin = this.auth.esAdmin;

  // Llama al servicio para cerrar sesión y redirige al login cuando finaliza
  logout() {
    this.auth.logout().subscribe({
      next: () => {
        // Cuando el backend confirma el logout, navegamos a la página de login
        this.router.navigate(['/login']);
      },
    });
  }
}
