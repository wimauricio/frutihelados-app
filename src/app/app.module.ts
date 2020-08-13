import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InversionComponent } from './pages/inversion/inversion.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { DialogoComponent } from './pages/inversion/dialogo/dialogo.component';
import { NuevoComponent } from './pages/inversion/nuevo/nuevo.component';
import { VentaComponent } from './pages/venta/venta.component';
import { DlgventaComponent } from './pages/venta/dlgventa/dlgventa.component';
import { DeudaComponent } from './pages/deuda/deuda.component';


@NgModule({
  declarations: [
    AppComponent,
    InversionComponent,
    ReportesComponent,
    DialogoComponent,
    NuevoComponent,
    VentaComponent,
    DlgventaComponent,
    DeudaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [DatePipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
