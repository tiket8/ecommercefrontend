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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'electronica', component: ElectronicaComponent },
  { path: 'beterwere', component: BeterwereComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'pedidos', component: AdminPedidosComponent },
      { path: 'productos', component: AdminProductosComponent },
      { path: 'usuarios', component: AdminUsuariosComponent },
      { path: 'estadisticas', component: AdminEstadisticasComponent },
    ]
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
