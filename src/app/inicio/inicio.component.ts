import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    nombre: '',
    direccion: '',
    telefono: '',
    celular: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  showLogin = false;
  showRegister = false;
  ofertas: any[] = [];  // Asegúrate de definir tus ofertas

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Aquí puedes inicializar las ofertas si es necesario
  }

  toggleLogin(): void {
    this.showLogin = !this.showLogin;
    this.showRegister = false;
  }

  toggleRegister(): void {
    this.showRegister = !this.showRegister;
    this.showLogin = false;
  }

  onLoginSubmit(): void {
    this.authService.login(this.loginData).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    }, error => {
      console.error('Error en el inicio de sesión', error);
    });
  }

  onRegisterSubmit(): void {
    this.authService.register(this.registerData).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    }, error => {
      if (error.status === 422) {
        // Muestra los errores de validación
        console.error('Errores de validación', error.error.errors);
      } else {
        console.error('Error en el registro', error);
      }
    });
  }
}
