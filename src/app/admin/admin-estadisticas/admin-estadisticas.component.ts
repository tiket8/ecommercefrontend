import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';  

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.css']
})
export class AdminEstadisticasComponent implements OnInit {
  public estadisticas: any[] = [];  // Asegúrate de que esto sea un array
  public filtro: string = 'semana';  // Filtro por día o semana

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.cargarDatos();  // Cargar las estadísticas al iniciar
  }

  // Cargar los datos de las estadísticas
  cargarDatos(): void {
    this.adminService.obtenerVentasPorCategoria(this.filtro).subscribe(
      (response: any) => {
        // Verifica los datos recibidos
        console.log('Datos recibidos:', response);

        // Combina las categorías y ventas en un solo array
        if (response.categorias && response.ventas && Array.isArray(response.categorias) && Array.isArray(response.ventas)) {
          this.estadisticas = response.categorias.map((categoria: string, index: number) => {
            return {
              categoria: categoria,
              ventas: response.ventas[index]
            };
          });
        } else {
          console.error('Los datos recibidos no son válidos:', response);
        }

        // Log para verificar el resultado final
        console.log('Estadísticas procesadas:', this.estadisticas);
      },
      error => {
        console.error('Error al cargar las estadísticas', error);
      }
    );
  }

  // Actualiza el filtro entre día y semana
  actualizarFiltro(nuevoFiltro: string): void {
    this.filtro = nuevoFiltro;
    this.cargarDatos();  // Recargar las estadísticas
  }
}
