import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuarioService {
  private apiUrl = 'http://localhost:8000/api/admin/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
