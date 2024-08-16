import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ElectronicaComponent } from './electronica/electronica.component';
import { BeterwereComponent } from './beterwere/beterwere.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AdminPedidosComponent } from './admin/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './admin/admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin/admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin/admin-estadisticas/admin-estadisticas.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { OfertaService } from './oferta.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ElectronicaComponent,
    BeterwereComponent,
    CarritoComponent,
    PerfilComponent,
    PedidosComponent,
    AdminPedidosComponent,
    AdminProductosComponent,
    AdminUsuariosComponent,
    AdminEstadisticasComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    AuthService,
    OfertaService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
