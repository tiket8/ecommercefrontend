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
  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/productos`);
  }

  agregarProducto(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/productos`, data);
  }

  desactivarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/productos/${id}`);
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
