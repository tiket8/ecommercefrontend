import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private apiUrl = 'http://localhost:8000/api/ofertas'; // Asegúrate de usar la URL correcta

  constructor(private http: HttpClient) {}

  getOfertas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
