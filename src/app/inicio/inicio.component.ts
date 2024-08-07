import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OfertaService } from '../oferta.service';

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
  validationErrors: any = {};
  ofertas: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private ofertaService: OfertaService
  ) {}

  ngOnInit(): void {
    this.obtenerOfertas();
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
      this.router.navigate(['/admin']);
    }, error => {
      console.error('Error en el inicio de sesión', error);
    });
  }

  onRegisterSubmit(): void {
    this.authService.register(this.registerData).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/admin']);
    }, error => {
      if (error.status === 422) {
        this.validationErrors = error.error.errors;
      } else {
        console.error('Error en el registro', error);
      }
    });
  }

  obtenerOfertas(): void {
    this.ofertaService.getOfertas().subscribe(response => {
      this.ofertas = response;
    }, error => {
      console.error('Error al obtener las ofertas', error);
    });
  }
}
