import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  //selector para usar el componente en HTML
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})

export class Menu {
  private router = inject(Router); // Servicio de autenticación HTTP
  private auth = inject(GestionarUsuarios); // Servicio de navegacion

  estaAutenticado = this.auth.estaAutenticado;

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
