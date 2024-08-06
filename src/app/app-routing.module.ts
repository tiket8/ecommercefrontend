import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ElectronicaComponent } from './electronica/electronica.component';
import { BeterwereComponent } from './beterwere/beterwere.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminPedidosComponent } from './admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';

const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'electronica', component: ElectronicaComponent },
    { path: 'beterwere', component: BeterwereComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'admin/pedidos', component: AdminPedidosComponent },
    { path: 'admin/productos', component: AdminProductosComponent },
    { path: 'admin/usuarios', component: AdminUsuariosComponent },
    { path: 'admin/estadisticas', component: AdminEstadisticasComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
