import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8000/api';
  private categoriaActual: string | null = null;  // Para almacenar la categoría actual del carrito

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  obtenerCarrito(categoria?: string): Observable<any> {
    const headers = this.getHeaders();
    let url = `${this.apiUrl}/carrito`;
    if (categoria) {
      url += `/${categoria}`;
    }
    return this.http.get(url, { headers });
  }

  agregarProductoAlCarrito(producto_id: number, categoria: string, cantidad: number): Observable<any> {
    const headers = this.getHeaders();

    if (this.categoriaActual && this.categoriaActual !== categoria) {
      return new Observable(observer => {
        observer.error('No puedes mezclar productos de diferentes categorías en el carrito.');
      });
    }

    return this.http.post(`${this.apiUrl}/carrito`, { producto_id, categoria, cantidad }, { headers });
  }

  eliminarProductoDelCarrito(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/carrito/${id}`, { headers });
  }

  realizarPedido(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/pedidos`, {}, { headers });
  }

  limpiarCarrito(): void {
    this.categoriaActual = null;
  }
}
