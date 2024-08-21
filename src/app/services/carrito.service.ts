import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8000/api';  // URL base de la API para las solicitudes del carrito
  private categoriaActual: string | null = null;  // Variable para almacenar la categoría actual del carrito, permitiendo evitar la mezcla de productos de diferentes categorías

  constructor(private http: HttpClient) {}

  // Método para obtener los encabezados HTTP de autorización, utilizando el token almacenado en el localStorage
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Método para obtener los productos en el carrito, con la opción de filtrar por categoría
  obtenerCarrito(categoria?: string): Observable<any> {
    const headers = this.getHeaders();  // Obtiene los encabezados de autorización
    let url = `${this.apiUrl}/carrito`;  // URL base del carrito
    if (categoria) {
      url += `/${categoria}`;  // Si se pasa una categoría, se agrega a la URL
    }
    return this.http.get(url, { headers });  // Realiza la solicitud GET al backend para obtener el carrito
  }

  // Método para agregar un producto al carrito, con validación para evitar mezclar categorías
  agregarProductoAlCarrito(producto_id: number, categoria: string, cantidad: number): Observable<any> {
    const headers = this.getHeaders();

    // Verifica si ya hay productos en el carrito de otra categoría
    if (this.categoriaActual && this.categoriaActual !== categoria) {
      return new Observable(observer => {
        observer.error('No puedes mezclar productos de diferentes categorías en el carrito.');  // Error si se intenta mezclar categorías
      });
    }

    return this.http.post(`${this.apiUrl}/carrito`, { producto_id, categoria, cantidad }, { headers });  // Realiza la solicitud POST al backend para agregar el producto al carrito
  }

  // Método para eliminar un producto del carrito
  eliminarProductoDelCarrito(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/carrito/${id}`, { headers });  // Realiza la solicitud DELETE al backend para eliminar un producto del carrito
  }

  // Método para realizar el pedido, enviando el tipo de pago seleccionado
  realizarPedido(tipoPago: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/pedidos`, { tipo_pago: tipoPago }, { headers });  // Realiza la solicitud POST al backend para realizar el pedido
  }

  // Método para limpiar el carrito después de completar el pedido, restableciendo la categoría actual
  limpiarCarrito(): void {
    this.categoriaActual = null;  // Resetea la categoría actual después de vaciar el carrito
  }
}
