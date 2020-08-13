import { DatePipe, CurrencyPipe } from '@angular/common';
import { DialogoComponent } from './dialogo/dialogo.component';
import { InversionService } from './../../_service/inversion.service';
import { Inversion } from './../../_model/inversion';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.css']
})
export class InversionComponent implements OnInit {

  dataSource: MatTableDataSource<Inversion>; 
  displayColumns = ['id', 'nombre', 'total', 'acciones'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inversionService: InversionService, private dialog: MatDialog, private snackbar: MatSnackBar, public route: ActivatedRoute,
    public datepipe: DatePipe, public currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.listarTodo();

    this.inversionService.mensajeCambio.subscribe(data=>{
      this.snackbar.open(data, 'AVISO',{
        duration: 30000
      })
      this.listarTodo();
    });
  }

  listarTodo(){
    this.inversionService.listarInversiones().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  openDialog(idInversion : number){
    this.dialog.open(DialogoComponent, {
      width:'100%',
      disableClose: false,
      data: idInversion
    });
  }

  fechaFormat(fecha: string):string{
    return this.datepipe.transform(fecha, "dd/MMMM/yy, h:mm a");
  }

  fortmat(num: number) : string{
    return this.currencyPipe.transform(num);
  }
}
