import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  productoIdResaltado: number | null = null;
  isResaltadoAplicado: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarProductos();

    // Captura el parámetro 'producto' desde la URL
    this.route.queryParams.subscribe(params => {
      this.productoIdResaltado = params['producto'] ? +params['producto'] : null;
    });
  }
  

  cargarProductos(): void {
    this.productoService.obtenerProductosElectronica().subscribe(
      (data: any[]) => {
        this.productos = data;
        this.isResaltadoAplicado = false;
      },
      (error) => {
        console.error('Error al cargar los productos de electrónica', error);
      }
    );
  }

  ngAfterViewChecked(): void {
    // Comprobamos si el resaltado ya ha sido aplicado
    if (this.productoIdResaltado && !this.isResaltadoAplicado) {
      this.resaltarProducto();
    }
  }

  resaltarProducto(): void {
    if (this.productoIdResaltado) {
      setTimeout(() => {
        const elemento = document.getElementById(`producto-${this.productoIdResaltado}`);
        if (elemento) {
          // Eliminamos la clase 'resaltado' de cualquier otro producto para evitar múltiples resaltados
          const productosResaltados = document.querySelectorAll('.resaltado');
          productosResaltados.forEach((producto) => {
            producto.classList.remove('resaltado');
          });
  
          // Aplicamos la clase 'resaltado' al producto seleccionado
          elemento.classList.add('resaltado');
  
          // Desplazamos la vista al producto resaltado
          elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
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
