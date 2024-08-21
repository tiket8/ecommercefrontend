import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';  // Importa el servicio del carrito
import Swal from 'sweetalert2';  // Librería para mostrar alertas personalizadas

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];  // Arreglo para almacenar los productos del carrito
  total: number = 0;  // Variable para almacenar el total del carrito
  tipoPago: string = '';  // Variable para almacenar el tipo de pago seleccionado por el usuario

  constructor(private carritoService: CarritoService) {}

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.cargarCarrito();  // Llama al método para cargar los productos del carrito al iniciar
  }

  // Método para cargar los productos del carrito desde el backend
  cargarCarrito(): void {
    this.carritoService.obtenerCarrito('electronica').subscribe(
      data => {
        this.carrito = data;  // Asigna los productos obtenidos al arreglo `carrito`
        this.calcularTotal();  // Calcula el total del carrito
      },
      error => {
        console.error('Error al cargar el carrito', error);  // Manejo de errores en caso de fallo
      }
    );
  }

  // Método para eliminar un producto del carrito
  eliminarProductoDelCarrito(productoId: number): void {
    this.carritoService.eliminarProductoDelCarrito(productoId).subscribe(() => {
      this.carrito = this.carrito.filter(item => item.id !== productoId);  // Filtra el carrito eliminando el producto con el ID especificado
      this.calcularTotal();  // Recalcula el total después de eliminar un producto
    });
  }

  // Método para calcular el total del carrito
  calcularTotal(): void {
    this.total = this.carrito.reduce((acc, item) => {
      const precio = item.producto?.precio || 0;  // Accede al precio del producto y maneja valores nulos
      return acc + (precio * item.cantidad);  // Suma el precio por la cantidad al total
    }, 0);
  }

  // Método para realizar el pedido
  realizarPedido(): void {
    // Verifica si se ha seleccionado un tipo de pago antes de realizar el pedido
    if (!this.tipoPago) {
      Swal.fire('Error', 'Por favor selecciona un tipo de pago.', 'error');  // Muestra una alerta si no se selecciona tipo de pago
      return;
    }

    // Muestra un diálogo de confirmación para realizar el pedido
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas realizar este pedido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, realizar pedido',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama al servicio para realizar el pedido, pasando el tipo de pago seleccionado
        this.carritoService.realizarPedido(this.tipoPago).subscribe(
          response => {
            Swal.fire('¡Pedido realizado!', 'Tu pedido ha sido procesado exitosamente.', 'success');  // Muestra una alerta de éxito al realizar el pedido
            this.carrito = [];  // Limpia el carrito
            this.total = 0;  // Resetea el total
          },
          error => {
            Swal.fire('Error', 'Ocurrió un problema al realizar el pedido.', 'error');  // Muestra una alerta en caso de error
          }
        );
      }
    });
  }
}
