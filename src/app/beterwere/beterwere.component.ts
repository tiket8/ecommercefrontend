import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service'; 
import { CarritoService } from '../services/carrito.service'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beterwere',
  templateUrl: './beterwere.component.html',
  styleUrls: ['./beterwere.component.css']
})
export class BeterwereComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductosBeterwere().subscribe(
      (data: any[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar los productos de beterwere', error);
      }
    );
  }

  agregarAlCarrito(producto: any): void {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Iniciar sesión',
        text: 'Debes iniciar sesión para agregar productos al carrito.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    this.carritoService.agregarProductoAlCarrito(producto.id, 'beterwere', 1).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }
}
