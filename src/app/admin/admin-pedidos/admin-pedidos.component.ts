import { Component, OnInit } from '@angular/core';
import { AdminPedidoService } from '../../admin-pedido.service';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css']
})
export class AdminPedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private adminPedidoService: AdminPedidoService) {}

  ngOnInit(): void {
    this.adminPedidoService.obtenerPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  actualizarEstado(id: number, estado: string): void {
    this.adminPedidoService.actualizarPedido(id, estado).subscribe(() => {
      this.pedidos = this.pedidos.map(pedido => pedido.id === id ? { ...pedido, estado } : pedido);
    });
  }
}
