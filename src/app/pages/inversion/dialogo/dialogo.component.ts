import { SaborService } from './../../../_service/sabor.service';
import { IngredienteService } from './../../../_service/ingrediente.service';
import { HeladoDisponible } from './../../../_model/heladoDisponible';
import { IngredienteInversion } from './../../../_model/ingredienteInversion';
import { InversionService } from './../../../_service/inversion.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sabor } from 'src/app/_model/sabor';
import { Ingrediente } from 'src/app/_model/ingrediente';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogoComponent>, @Inject(MAT_DIALOG_DATA) public idInversion:number, 
    private inversionService : InversionService, private ingredienteService: IngredienteService,
     private saborService : SaborService) { }

  sabores : Sabor[];
  ingredientes : Ingrediente[];
  ingredienteInversion: IngredienteInversion[];
  heladosDisponibles : HeladoDisponible[];
  disableDlg : boolean = false;

  ngOnInit(): void {
    this.inversionService.listarIngredientesPorInversion(this.idInversion).subscribe(data => {
      this.ingredienteInversion = data;
    });

    this.inversionService.listarHeladosDisponiblesPorInversion(this.idInversion).subscribe(data=>{
      this.heladosDisponibles = data;
      if(this.heladosDisponibles[0].cantidadVasosDispobibles === 0){
        this.disableDlg = true;
      }
    });

    this.ingredienteService.listar().subscribe(data=> {
      this.ingredientes = data;
    });

    this.saborService.listar().subscribe(data=> {
      this.sabores = data;
    });
  }

  disableBtnActualizarIngrediente(inInver: IngredienteInversion): boolean{
    return inInver.cantidad === null || inInver.valorTotal === null || this.disableDlg;
  }

  disableBtnActualizarHelDisp(heladoDisp: HeladoDisponible): boolean{
    return heladoDisp.cantidadVasosPreparados === null || heladoDisp.cantidadVasosDispobibles === null
      || heladoDisp.valorVasoUnidad === null || this.disableDlg;
  }
  cancelar(){
    this.dialogRef.close();
  }

  eliminarIngrediente(ingredienteInv: IngredienteInversion){
    this.inversionService.eliminarIngredienteInversion(ingredienteInv).subscribe(data=>{
      this.inversionService.mensajeCambio.next('Se elimino el registro con Exito');
    });
    this.dialogRef.close();
  }

  actualizarIngredinete(ingredienteInv: IngredienteInversion){
   
    this.inversionService.actualizarIngredienteInversion(ingredienteInv).subscribe(data=>{
      this.inversionService.mensajeCambio.next('Se realizó con exito la actualización');
    });
    this.dialogRef.close();
  }

  actualizarHeladoDisponible(heladoDisp: HeladoDisponible){
    heladoDisp.idInversion = this.idInversion;
    this.inversionService.actualizarHeladoDisponible(heladoDisp).subscribe(data=>{
      this.inversionService.mensajeCambio.next('Se realizó con exito la actualización');
    });
    this.dialogRef.close();
  }
}
