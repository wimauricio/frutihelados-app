import { Subject } from 'rxjs';
import { VentaService } from './../../_service/venta.service';
import { DlgventaComponent } from './dlgventa/dlgventa.component';
import { DialogoComponent } from './../inversion/dialogo/dialogo.component';
import { HeladoDisponible } from './../../_model/heladoDisponible';
import { SaborService } from './../../_service/sabor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Venta } from 'src/app/_model/venta';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  heladosDisponibles : HeladoDisponible[];
  listadoVentas : Venta[] =[];
  totalVenta: number;

  constructor(private snackbar: MatSnackBar, private saborService : SaborService, private router : Router,  private dialog: MatDialog,
    private ventaService: VentaService) { }
  
  ngOnInit(): void {
    this.saborService.listarHeladoDIsponible().subscribe(data=> {
      this.heladosDisponibles = data;
    });

    this.ventaService.ventaAdd.subscribe(data=>{
      this.adicionarVenta(data)
    });
  }

  adicionarVenta(venta: Venta){
    this.listadoVentas.push(venta);
    this.generarTotal();
    
  }

  generarTotal(){
    let total=0;
    this.listadoVentas.forEach(v=>{
      console.log(v.cantidadVasosVendidos * v.heladoDisponible.valorVasoUnidad)
      total += v.cantidadVasosVendidos * v.heladoDisponible.valorVasoUnidad;
    });
    this.totalVenta = total;
  }

  openDlg(heladoDis: HeladoDisponible){
    const dialogRef = this.dialog.open(DlgventaComponent, {
      width: '500px',
      disableClose:false,
      data: heladoDis
    });

    dialogRef.afterClosed().subscribe(data=>{
      let venta = new Venta();
      if(data != null){
         venta = data;
        if(venta.pago){
          venta.deudor = null;
        }
       this.adicionarVenta(venta);
      }
    });
  }

  eliminar(index: number){
    this.listadoVentas.splice(index, 1);
    this.generarTotal();
  }

  estadoBtn(): boolean{
    return this.listadoVentas.length === 0;
  }
  guardar(){
    this.ventaService.registrarVenta(this.listadoVentas).subscribe(data=>{
      this.snackbar.open("Se Registró Venta con Exito","Aviso", {duration : 3000})
    });
  }
}
