import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPedidoService {
  private apiUrl = 'http://localhost:8000/api/admin/pedidos';

  constructor(private http: HttpClient) {}

  obtenerPedidos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  obtenerPedido(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarPedido(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { estado });
  }
}
