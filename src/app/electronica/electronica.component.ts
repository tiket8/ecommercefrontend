import { AfterViewChecked, Component, OnInit } from '@angular/core';
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
export class ElectronicaComponent implements OnInit, AfterViewChecked {
  productos: any[] = [];
  filtro: string = '';     // Variable para almacenar el término de búsqueda
  productoIdResaltado: number | null = null;
  isResaltadoAplicado: boolean = false;
  mostrarModal: boolean = false;  // Variable para mostrar/ocultar el modal
  productoSeleccionado: any = null;  // Producto seleccionado para mostrar en el modal
  mostrarModalCantidad = false;  // Controla la visibilidad del modal de cantidad
  cantidadSeleccionada: number = 1;  // Almacena la cantidad seleccionada por el usuario
  
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Función para abrir el modal de ver más
  abrirVentanaFlotante(producto: any): void {
    this.productoSeleccionado = producto;  // Asigna el producto seleccionado
    this.mostrarModal = true;  // Muestra el modal
  }

  // Función para cerrar el modal de ver más
  cerrarVentanaFlotante(): void {
    this.mostrarModal = false;  // Oculta el modal
    this.productoSeleccionado = null;  // Limpia el producto seleccionado
  }

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
    console.log(`Intentando resaltar el producto con ID: ${this.productoIdResaltado}`);
  
    setTimeout(() => {
      const elemento = document.getElementById(`producto-${this.productoIdResaltado}`);
      console.log(elemento); // Verifica si el elemento es encontrado
  
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        elemento.classList.add('resaltado');
        this.isResaltadoAplicado = true;
      } else {
        console.log('El elemento no fue encontrado en el DOM');
      }
    }, 100); // Retraso de 100ms para asegurarse de que el DOM esté renderizado
  }

  // Lógica para agregar un producto al carrito con selección de cantidad
  agregarAlCarrito(producto: any, cantidad: number): void {
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
    this.carritoService.agregarProductoAlCarrito(producto.id, categoria, cantidad).subscribe(
      response => {
        console.log(`Producto agregado al carrito con cantidad: ${cantidad}`, response);
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  // Abre la ventana flotante para seleccionar la cantidad
  abrirVentanaCantidad(producto: any): void {
    // Verifica que el producto y su cantidad estén definidos correctamente
    if (producto && typeof producto.cantidad === 'number' && producto.cantidad > 0) {
      Swal.fire({
        title: 'Selecciona la cantidad',
        input: 'number',
        inputLabel: `Cantidad disponible: ${producto.cantidad}`,
        inputValue: 1,
        showCancelButton: true,
        confirmButtonText: 'Añadir al carrito',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          const cantidadSeleccionada = Number(value);  // Asegura que el valor sea un número
          
          if (!cantidadSeleccionada || cantidadSeleccionada <= 0) {
            return 'Debes seleccionar una cantidad válida';
          }
    
          if (cantidadSeleccionada > producto.cantidad) {
            return `Solo hay ${producto.cantidad} unidades disponibles`;
          }

          return null;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const cantidadSeleccionada = Number(result.value);  // Convierte el valor de entrada a número antes de usarlo
          this.agregarAlCarrito(producto, cantidadSeleccionada);  // Llama a la función para agregar al carrito con la cantidad seleccionada
        }
      });
    } else {
      // Si no hay stock o el producto no está bien definido, muestra un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El producto no tiene stock disponible o hubo un error.',
        confirmButtonText: 'OK'
      });
    }
  }

  // Cierra el modal de selección de cantidad
  cerrarVentanaCantidad(): void {
    this.mostrarModalCantidad = false;  // Oculta el modal
  }
}
