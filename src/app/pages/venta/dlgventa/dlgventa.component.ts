import { VentaService } from './../../../_service/venta.service';
import { Deudor } from './../../../_model/deudor';
import { Venta } from './../../../_model/venta';
import { HeladoDisponible } from './../../../_model/heladoDisponible';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dlgventa',
  templateUrl: './dlgventa.component.html',
  styleUrls: ['./dlgventa.component.css']
})
export class DlgventaComponent implements OnInit {
  fechaSeleccionada:  Date = new Date();
  venta : Venta;
  deudor = new  Deudor();
  constructor(private dialogRef: MatDialogRef<DlgventaComponent>, @Inject(MAT_DIALOG_DATA) public data:HeladoDisponible, private ventaService: VentaService) { }

  ngOnInit(): void {
    this.venta = new Venta();
    this.venta.heladoDisponible = this.data;
    this.venta.fecha = this.fechaSeleccionada.toISOString();
    this.venta.pago = true;
    this.venta.deudor= this.deudor;
  }

 

  verMensaje() : boolean{
    return this.venta.pago === false && this.venta.cantidadVasosVendidos < this.venta.deudor.cantidadVasosDeuda;
  }

  disableBtn() : boolean{
    return this.venta.pago === false && this.venta.deudor.cantidadVasosDeuda == null 
      ||  this.venta.pago === false && this.venta.cantidadVasosVendidos < this.venta.deudor.cantidadVasosDeuda
      ||  this.venta.pago === false && this.venta.deudor.nombres.length === 0
      ||  this.venta.pago === false && this.venta.deudor.apellidos.length === 0
      || this.venta.pago === true && this.venta.cantidadVasosVendidos == null;
  }
 

}
