import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../models/producto';
@Component({
  selector: 'app-electronica',
  templateUrl: './electronica.component.html',
  styleUrls: ['./electronica.component.css']
})
export class ElectronicaComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(producto => producto.categoria === 'electronica');
    });
  }
}
