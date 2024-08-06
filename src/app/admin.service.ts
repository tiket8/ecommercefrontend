import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  // Pedidos
  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidos`);
  }

  getPedido(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedidos/${id}`);
  }

  updatePedido(id: string, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedidos/${id}`, { estado });
  }

  // Productos
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  createProducto(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productos`, data);
  }

  updateProducto(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/productos/${id}`, data);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/productos/${id}`);
  }

  // Usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  // Estadísticas
  getEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas`);
  }
}
