import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  // Método para obtener los encabezados de autenticación
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Pedidos
  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidos`, this.getAuthHeaders());
  }

  getPedido(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedidos/${id}`, this.getAuthHeaders());
  }

  updatePedido(id: string, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedidos/${id}`, { estado }, this.getAuthHeaders());
  }

  // Productos
  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`, this.getAuthHeaders());
  }

  agregarProducto(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, data, this.getAuthHeaders());
  }

  desactivarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`, this.getAuthHeaders());
  }

  // Usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, this.getAuthHeaders());
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${id}`, this.getAuthHeaders());
  }

  // Estadísticas
  getEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas`, this.getAuthHeaders());
  }
}
