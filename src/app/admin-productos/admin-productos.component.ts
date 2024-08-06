import { Component, OnInit } from '@angular/core';
import { AdminProductoService } from '../admin-producto.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private adminProductoService: AdminProductoService) {}

  ngOnInit(): void {
    this.adminProductoService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }

  desactivarProducto(id: number): void {
    this.adminProductoService.desactivarProducto(id).subscribe(() => {
      this.productos = this.productos.filter(producto => producto.id !== id);
    });
  }
}
