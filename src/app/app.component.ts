import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ecommercefrontend';
  constructor(public authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
   // Propiedad para controlar la visibilidad del menú
   menuVisible: boolean = false;

   // Método para alternar la visibilidad del menú
   toggleMenu(): void {
     this.menuVisible = !this.menuVisible;
   }
}
