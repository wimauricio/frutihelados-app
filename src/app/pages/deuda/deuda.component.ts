import { Venta } from 'src/app/_model/venta';
import { VentaService } from './../../_service/venta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deuda',
  templateUrl: './deuda.component.html',
  styleUrls: ['./deuda.component.css']
})
export class DeudaComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private ventaService : VentaService) { }

  ventasDeuda: Venta[];
  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.ventaService.listarDeudores().subscribe(data=>{
      this.ventasDeuda = data;
    });
  }

  actualizar(){
    let ve: number;
    let o : number;
  }

  total(cantidad : number, precio : number){
    return cantidad * precio;
  }

  mostrarMensaje(valor : number, valor2 : number): boolean{
    return valor > valor2;
  }

  actualizarVenta(venta: Venta){
    this.ventaService.actualizarDeudores(venta).subscribe(data=>{
      this.snackbar.open("Se actualizó deuda con exito.","Aviso", {duration : 3000})
      this.listar();
    });
  }

}
