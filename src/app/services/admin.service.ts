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

  updateProducto(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, data, this.getAuthHeaders());
  }

    // Usuarios
    
  // Listar usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, this.getAuthHeaders());
  }
  // Ver detalles de un usuario
  obtenerUsuario(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`, this.getAuthHeaders());
  }

  // Desactivar usuario
  desactivarUsuario(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/desactivar/${id}`, {}, this.getAuthHeaders());
  }
  activarUsuario(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/activar/${id}`, {}, this.getAuthHeaders());
  }
  
  //obtener estadisticas 
  getEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas`, this.getAuthHeaders());
  }
}
