import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = [];
  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    categoria: 'electronica',
    estado: true,
    foto: null
  };

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevoProducto.foto = file;
    }
  }

  agregarProducto() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('cantidad', this.nuevoProducto.cantidad.toString());
    formData.append('categoria', this.nuevoProducto.categoria);
    formData.append('estado', this.nuevoProducto.estado.toString());
    if (this.nuevoProducto.foto) {
      formData.append('foto', this.nuevoProducto.foto);
    }

    this.adminService.agregarProducto(formData).subscribe(response => {
      this.router.navigate(['/admin/productos']);
    }, error => {
      console.error('Error al agregar producto', error);
    });
  }

  obtenerProductos() {
    this.adminService.obtenerProductos().subscribe(response => {
      this.productos = response;
    }, error => {
      console.error('Error al obtener productos', error);
    });
  }

  desactivarProducto(id: number) {
    this.adminService.desactivarProducto(id).subscribe(response => {
      this.obtenerProductos();
    }, error => {
      console.error('Error al desactivar producto', error);
    });
  }
}
