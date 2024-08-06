import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  createProducto(producto: any): void {
    this.adminService.createProducto(producto).subscribe(response => {
      this.productos.push(response);
    });
  }

  updateProducto(id: string, producto: any): void {
    this.adminService.updateProducto(id, producto).subscribe(response => {
      this.productos = this.productos.map(p =>
        p.id === id ? response : p
      );
    });
  }

  deleteProducto(id: string): void {
    this.adminService.deleteProducto(id).subscribe(response => {
      this.productos = this.productos.filter(p => p.id !== id);
    });
  }
}
