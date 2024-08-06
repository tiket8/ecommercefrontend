import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css']
})
export class AdminPedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  actualizarEstado(id: string, estado: string): void {
    this.adminService.updatePedido(id, estado).subscribe(response => {
      // Actualiza el estado del pedido en la lista local
      this.pedidos = this.pedidos.map(pedido => 
        pedido.id === id ? { ...pedido, estado } : pedido
      );
    });
  }
}
