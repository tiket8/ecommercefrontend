import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = [];
  mostrarFormulario: boolean = false;
  productoSeleccionado: any = null; 

  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    categoria: 'electronica',
    estado: true,
    oferta: false,
    foto: null,
    codigo: ''
  };

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // Manejo del archivo al seleccionar una imagen
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevoProducto.foto = file;
    }
  }

  // Agregar un nuevo producto
  agregarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('cantidad', this.nuevoProducto.cantidad.toString());
    formData.append('categoria', this.nuevoProducto.categoria);
    formData.append('estado', this.nuevoProducto.estado ? '1' : '0');
    formData.append('oferta', this.nuevoProducto.oferta ? '1' : '0');
    formData.append('codigo', this.nuevoProducto.codigo);

    if (this.nuevoProducto.foto) {
      formData.append('foto', this.nuevoProducto.foto);
    }

    this.adminService.agregarProducto(formData).subscribe(response => {
      this.obtenerProductos();
      this.mostrarFormulario = false;
    }, error => {
      console.error('Error al agregar producto', error);
    });    
  }

  // Obtener todos los productos
  obtenerProductos() {
    this.adminService.obtenerProductos().subscribe(response => {
      // Ordenar los productos por cantidad de menor a mayor
      this.productos = response.sort((a, b) => a.cantidad - b.cantidad);
    }, error => {
      console.error('Error al obtener productos', error);
    });
  }

  // Desactivar un producto
  desactivarProducto(id: number) {
    this.adminService.desactivarProducto(id).subscribe(response => {
      this.obtenerProductos();
    }, error => {
      console.error('Error al desactivar producto', error);
    });
  }

  // Activa Producto
  activarProducto(id: number) {
    this.adminService.activarProducto(id).subscribe(response => {
      this.obtenerProductos();
    }, error => {
      console.error('Error al activar producto', error);
    });
  }

  // Editar un producto
  editarProducto(producto: any) {
    this.productoSeleccionado = { ...producto }; // Clonar el producto seleccionado
    this.mostrarFormulario = false; // Ocultar el formulario de nuevo producto
  }

  // Actualizar un producto existente
  actualizarProducto() {
    const producto = {
      nombre: this.productoSeleccionado.nombre || '',
      descripcion: this.productoSeleccionado.descripcion || '',
      precio: this.productoSeleccionado.precio.toString(),
      cantidad: this.productoSeleccionado.cantidad.toString(),
      categoria: this.productoSeleccionado.categoria || '',
      estado: this.productoSeleccionado.estado ? '1' : '0',
      oferta: this.productoSeleccionado.oferta ? '1' : '0',
      codigo: this.productoSeleccionado.codigo || ''
    };

    console.log('Campos enviados en JSON:', producto);

    this.adminService.updateProducto(this.productoSeleccionado.id, producto).subscribe(
      response => {
        this.obtenerProductos(); // Actualizar la lista de productos
        this.productoSeleccionado = null; // Limpiar la selección después de guardar
      },
      error => {
        console.error('Error al actualizar producto', error);
        console.log('Errores de validación:', error.error.errors);  // Muestra los errores de validación
      }
    );
  }

  // Cancelar la edición del producto
  cancelarEdicion() {
    this.productoSeleccionado = null; // Limpiar la selección y cerrar el formulario
  }
}
