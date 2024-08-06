import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  deleteUsuario(id: string): void {
    this.adminService.deleteUsuario(id).subscribe(response => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }
}
