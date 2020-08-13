import { InversionDTO } from './../../../_model/inversionDTO';
import { DatePipe } from '@angular/common';
import { HeladoDisponible } from './../../../_model/heladoDisponible';
import { Ingrediente } from 'src/app/_model/ingrediente';
import { SaborService } from './../../../_service/sabor.service';
import { IngredienteService } from './../../../_service/ingrediente.service';
import { IngredienteInversion } from './../../../_model/ingredienteInversion';
import { InversionService } from './../../../_service/inversion.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sabor } from 'src/app/_model/sabor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  ingredientes: Ingrediente[];
  sabores : Sabor[];
  fecha :  Date = new Date();
  fechaFormat : string;
  ingredienteInversion = new  IngredienteInversion();
  listIngredienteInversion : IngredienteInversion[] = [];
  heladoDisponible = new  HeladoDisponible();
  listHeladosDisponibles : HeladoDisponible[]=[];
  constructor(private inversionService: InversionService, private dialog: MatDialog, private snackbar: MatSnackBar,
    private ingredienteService: IngredienteService, private saborService : SaborService, public datepipe: DatePipe,
    private router : Router) { }

  ngOnInit(): void {
    this.inversionService.mensajeCambio.subscribe(data=>{
      this.snackbar.open(data, 'AVISO',{
        duration: 30000
      })
    });

    this.ingredienteService.listar().subscribe(data=> {
      this.ingredientes = data;
    });

    this.saborService.listar().subscribe(data=> {
      this.sabores = data;
    });

    this.fechaFormat = this.datepipe.transform(this.fecha, 'M/d/yy, h:mm a');
  }

  estadoBotonAdicionar() : boolean{
    return this.ingredienteInversion.ingrediente == null || this.ingredienteInversion.cantidad == null || this.ingredienteInversion.valorTotal == null;
  }

  estadoBotonAdicionarHelado() : boolean{
    return this.heladoDisponible.sabor == null || this.heladoDisponible.cantidadVasosDispobibles == null || this.heladoDisponible.cantidadVasosPreparados == null || this.heladoDisponible.valorVasoUnidad== null;
  }

  adicionar(){
    console.log(this.ingredienteInversion)
    this.listIngredienteInversion.push(this.ingredienteInversion);
    this.ingredienteInversion = new IngredienteInversion;
  }

  eliminarIngrediente(index: number){
    this.listIngredienteInversion.splice(index, 1);
  }


  adicionarHelado(){
    this.heladoDisponible.fecha = this.fecha.toISOString();
    this.heladoDisponible.idInversion = 0;
    this.listHeladosDisponibles.push(this.heladoDisponible);
    this.heladoDisponible = new HeladoDisponible;
  }

  eliminarHelado(index: number){
    this.listHeladosDisponibles.splice(index, 1);
  }

  estadoBotonGuardar() : boolean{
    return this.listHeladosDisponibles.length == 0 || this.listIngredienteInversion.length == 0;
  }
  guardar(){
    let inversionDTO = new InversionDTO();
    inversionDTO.listaHeladoDisponibles = this.listHeladosDisponibles;
    inversionDTO.listaIngredienteInversion = this.listIngredienteInversion;
    inversionDTO.fecha = this.fecha.toISOString();
    this.inversionService.guardar(inversionDTO).subscribe(data=>{
      this.inversionService.mensajeCambio.next('Se registro con exito la nueva Inversión');
    });

    this.router.navigate(['inversion']);
  }

}
