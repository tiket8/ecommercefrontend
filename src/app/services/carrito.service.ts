import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8000/api';
  private categoriaActual: string | null = null;  // Para almacenar la categoría actual del carrito

  constructor(private http: HttpClient) {}

  obtenerCarrito(categoria?: string): Observable<any> {
    let url = `${this.apiUrl}/carrito`;
    if (categoria) {
      url += `/${categoria}`;
    }
    return this.http.get(url);
  }

  agregarProductoAlCarrito(producto_id: number, categoria: string, cantidad: number): Observable<any> {
    // Verificar si hay productos en el carrito y la categoría coincide
    if (this.categoriaActual && this.categoriaActual !== categoria) {
      return new Observable(observer => {
        observer.error('No puedes mezclar productos de diferentes categorías en el carrito.');
      });
    }
  
    // Si no hay conflicto de categorías, procede a agregar el producto al carrito
    return this.http.post(`${this.apiUrl}/carrito`, { producto_id, categoria, cantidad });
  }

    // Si no hay productos o la categoría coincide, agrega el producto
   

  eliminarProductoDelCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito/${id}`);
  }

  limpiarCarrito(): void {
    this.categoriaActual = null;
  }
}
