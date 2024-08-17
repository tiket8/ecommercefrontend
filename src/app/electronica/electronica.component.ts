import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ProductoService } from '../services/producto.service'; 
import { AuthService } from '../auth.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-electronica',
  templateUrl: './electronica.component.html',
  styleUrls: ['./electronica.component.css']
})
export class ElectronicaComponent implements OnInit {
  productos: any[] = [];

  // dos inyecciones en un constructor
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductosElectronica().subscribe(
      (data: any[]) => {
        this.productos = data; // Asigna los productos recibidos a la propiedad productos
      },
      (error) => {
        console.error('Error al cargar los productos de electrónica', error);
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

    const categoria = 'electronica';
    this.carritoService.agregarProductoAlCarrito(producto.id, categoria, 1).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }
}