import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ElectronicaComponent } from './electronica/electronica.component';
import { BeterwereComponent } from './beterwere/beterwere.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AdminPedidosComponent } from './admin/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './admin/admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin/admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin/admin-estadisticas/admin-estadisticas.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'electronica', component: ElectronicaComponent },
  { path: 'beterwere', component: BeterwereComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'pedidos', component: PedidosComponent },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'menu', component: AdminMenuComponent },
      { path: 'pedidos', component: AdminPedidosComponent },
      { path: 'productos', component: AdminProductosComponent },
      { path: 'productos/nuevo', component: AdminProductosComponent },
      { path: 'usuarios', component: AdminUsuariosComponent },
      { path: 'estadisticas', component: AdminEstadisticasComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
