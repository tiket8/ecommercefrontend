import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8000/api/pedidos';

  constructor(private http: HttpClient) {}

  crearPedido(tipoPago: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { tipoPago });
  }

  obtenerPedidos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
