import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    // Proporciona el argumento 'categoria' a la función obtenerCarrito
    this.carritoService.obtenerCarrito('electronica').subscribe(data => {
      this.carrito = data;
    });
  }

  eliminarProductoDelCarrito(productoId: number): void {
    this.carritoService.eliminarProductoDelCarrito(productoId).subscribe(() => {
      this.carrito = this.carrito.filter(item => item.productoId !== productoId);
    });
  }
}
