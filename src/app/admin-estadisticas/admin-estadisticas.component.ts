import { Component, OnInit } from '@angular/core';
import { AdminEstadisticasService } from '../admin-estadisticas.service';

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.css']
})
export class AdminEstadisticasComponent implements OnInit {
  estadisticas: any;

  constructor(private adminEstadisticasService: AdminEstadisticasService) {}

  ngOnInit(): void {
    this.adminEstadisticasService.obtenerEstadisticas().subscribe(data => {
      this.estadisticas = data;
    });
  }
}
