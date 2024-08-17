import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    // Obtener carrito (cambiar la categoría según corresponda)
    this.carritoService.obtenerCarrito('electronica').subscribe(
      data => {
        this.carrito = data;
        this.calcularTotal();
      },
      error => {
        console.error('Error al cargar el carrito', error);
      }
    );
    
  }

  eliminarProductoDelCarrito(productoId: number): void {
    this.carritoService.eliminarProductoDelCarrito(productoId).subscribe(() => {
      this.carrito = this.carrito.filter(item => item.id !== productoId);
      this.calcularTotal();
    });
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((acc, item) => {
      console.log('Producto en el carrito:', item);
      const precio = item.producto?.precio || 0;  // Accede al precio correctamente
      return acc + (precio * item.cantidad);
    }, 0);
    console.log('Total calculado:', this.total);
  }
  

  realizarPedido(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas realizar este pedido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, realizar pedido',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para realizar el pedido
        this.carritoService.realizarPedido().subscribe(
          response => {
            Swal.fire('¡Pedido realizado!', 'Tu pedido ha sido procesado exitosamente.', 'success');
            this.carrito = []; // Limpiar el carrito
            this.total = 0;
          },
          error => {
            Swal.fire('Error', 'Ocurrió un problema al realizar el pedido.', 'error');
          }
        );
      }
    });
  }
}
