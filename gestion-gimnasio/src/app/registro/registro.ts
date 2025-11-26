import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  //selector para usar el componente en HTML
  selector: 'app-componente-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})

export class Registro {
  private gestionarUsuarios=inject(GestionarUsuarios);//Servicio de autenticación HTTP
  private router=inject(Router);// servicio de navegacion

  // Formulario reactivo con validaciones
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      // Campo CÓDIGO: obligatorio, mínimo 5 caracteres
      codigo: ['', [Validators.required, Validators.minLength(5)]],
      // Campo CLAVE: obligatorio, con validación de complejidad
      // Regex: mínimo 1 minúscula, 1 mayúscula, 1 dígito, 1 carácter especial, longitud >= 8
      clave: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')
        ]
      ],
      // Campo NOMBRE: obligatorio
      nombre: ['', [Validators.required]],
      // Campo EMAIL: obligatorio, con formato de email válido
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Se ejecuta cuando el usuario hace clic en el botón "Registrarse"
  onSubmit() {
    // Verifica que el formulario sea válido
    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
      // Extrae los valores del formulario
      this.gestionarUsuarios.registro(this.registroForm.get('codigo')?.value,
                                      this.registroForm.get('clave')?.value,
                                      this.registroForm.get('nombre')?.value,
                                      this.registroForm.get('email')?.value)
          .subscribe({
        next: () => {
          alert('Registro completado con éxito');
          // Navega a /login después del registro exitoso
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.error('Login fallido', err);
        }
      });
    } else {
      // Si el formulario no es válido, marca todos los campos como tocados
      // para mostrar los mensajes de error
      this.registroForm.markAllAsTouched();
    }
  }

  // Devuelve los controles del formulario para acceder desde el template
  get f() {
    return this.registroForm.controls;
  }
}


