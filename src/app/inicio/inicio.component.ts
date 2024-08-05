import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../models/producto';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  ofertas: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerOfertas();
  }

  obtenerOfertas(): void {
    this.productoService.obtenerProductos().subscribe(data => {
      this.ofertas = data.filter(producto => producto.oferta);
    });
  }
}
