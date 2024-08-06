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
import { AdminPedidosComponent } from './admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms';

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
    LoginComponent,
    RegisterComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

