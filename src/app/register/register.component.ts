import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario = {
    nombre: '',
    direccion: '',
    telefono: '',
    celular: '',
    email: '',
    password: '',
    password_confirmation: '' // Necesario para la validación de confirmación de contraseña
  };
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.usuario).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = 'Error al registrarse';
        if (error.status === 422) {
          const validationErrors = error.error.errors;
          if (validationErrors.email) {
            this.error = validationErrors.email.join(' ');
          } else {
            this.error = Object.values(validationErrors).join(' ');
          }
        }
      }
    );
  }
}
