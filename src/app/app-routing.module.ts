import { VentaComponent } from './pages/venta/venta.component';
import { NuevoComponent } from './pages/inversion/nuevo/nuevo.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { InversionComponent } from './pages/inversion/inversion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeudaComponent } from './pages/deuda/deuda.component';

const routes: Routes = [
  {path : 'inversion' , component : InversionComponent, children :[
    {path: 'nuevo', component : NuevoComponent}
  ]},
  {path : 'reportes' , component : ReportesComponent},
  {path : 'venta' , component : VentaComponent},
  {path : 'deuda' , component : DeudaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
