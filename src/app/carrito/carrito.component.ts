import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe(data => {
      this.carrito = data;
    });
  }

  eliminarProducto(productoId: number): void {
    this.carritoService.eliminarProducto(productoId).subscribe(() => {
      this.carrito = this.carrito.filter(item => item.productoId !== productoId);
    });
  }
}
