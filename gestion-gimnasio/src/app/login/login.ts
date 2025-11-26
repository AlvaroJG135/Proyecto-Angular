import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  //selector para usar el componente en HTML
  selector: 'app-componente-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

// Gestiona el formulario de inicio de sesión
export class Login {

  private auth = inject(GestionarUsuarios); // Servicio de autenticación HTTP
  private router = inject(Router); // Servicio de navegacion

  error: string = "";
  codigo = ''; 
  clave = '';


  //Manejo del envío del formulario
  onSubmit() {
    // Llama al servicio de autenticación con usuario y contraseña
    this.auth.login(this.codigo, this.clave).subscribe({
      
      // Login exitoso
      next: () => {
        this.error = ""; // Limpia cualquier mensaje de error anterior
        // Redirige al dashboard
        this.router.navigateByUrl('/dashboard');
      },
      
      // Error en el login
      error: (err) => {
        console.error('Login fallido', err); // Log del error
        // Muestra mensaje de error al usuario
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}

