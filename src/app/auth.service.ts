import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  user: { rol: string }; // Asumiendo que la API devuelve el rol del usuario
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        // Almacena el rol del usuario
        localStorage.setItem('rol', response.user.rol);
        // Redirige según el rol del usuario
        if (response.user.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      })
    );
  }

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol'); // Eliminar también el rol
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'admin';
  }
}
