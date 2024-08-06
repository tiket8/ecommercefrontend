import { Component, OnInit } from '@angular/core';
import { AdminUsuarioService } from '../../admin-usuario.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private adminUsuarioService: AdminUsuarioService) {}

  ngOnInit(): void {
    this.adminUsuarioService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminarUsuario(id: number): void {
    this.adminUsuarioService.eliminarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    });
  }
}
