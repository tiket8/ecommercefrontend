import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8000/api/carrito';

  constructor(private http: HttpClient) {}

  agregarProducto(productoId: number, cantidad: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/agregar', { productoId, cantidad });
  }

  obtenerCarrito(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  eliminarProducto(productoId: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/eliminar/' + productoId);
  }
}
