import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ElectronicaComponent } from './electronica/electronica.component';
import { BeterwereComponent } from './beterwere/beterwere.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'electronica', component: ElectronicaComponent },
    { path: 'beterwere', component: BeterwereComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
