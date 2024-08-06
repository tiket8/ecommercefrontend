import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  celular: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const user = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,
      celular: this.celular,
      email: this.email,
      password: this.password,
      rol: 'cliente',
      estado: true
    };

    this.http.post('http://localhost:8000/api/register', user)
      .subscribe(response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      }, error => {
        console.error('Error registering user', error);
      });
  }
}