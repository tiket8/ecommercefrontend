import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';  // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.obtenerPedidosUsuario();
  }

  obtenerPedidosUsuario(): void {
    this.pedidoService.obtenerPedidosUsuario().subscribe(
      (response) => {
        this.pedidos = response;
      },
      (error) => {
        console.error('Error al obtener los pedidos del usuario:', error);
      }
    );
  }
}
