import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  obtenerCarrito(categoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/carrito/${categoria}`);
  }

  agregarProductoAlCarrito(producto_id: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito`, { producto_id, cantidad });
  }

  eliminarProductoDelCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito/${id}`);
  }
}
