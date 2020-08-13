import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ReporteDTO } from './../../_model/reporteDTO';
import { VentaService } from './../../_service/venta.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  totalVsDisp : number = 0;
  totalVsVendido: number= 0;
  totalCaja: number= 0;
  totalVsDeuda: number= 0;
  totalDeuda:  number= 0;
  totalEsperado: number= 0;


  reporteDto : ReporteDTO[];
  dataSource: MatTableDataSource<ReporteDTO>;
  displayColumns = ['sabor', 'cantVDis', 'cantVV','valUn','ttlcaja' , 'ctdeuda' , 'ttdeuda', 'ttesperado'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ventaService: VentaService, public datepipe: DatePipe, public currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.ventaService.obtenerReporte().subscribe(data=>{
      this.reporteDto = data;
    });
  }

  calcularTotales(data: ReporteDTO[]){
    data.forEach(d=>{
      this.totalVsDisp += d.cantidadVasosDisponibles;
      this.totalVsVendido += d.cantidadVasosVendidos;
      this.totalCaja += d.totalEnCaja;
      this.totalVsDeuda += d.cantidadVasosVendidosEnDeuda;
      this.totalDeuda += d.totalVasosVendidosDeuda;
      this.totalEsperado += d.totalDineroEsperado;
    });
  }

  fechaFormat(fecha: Date):string{
    return this.datepipe.transform(fecha, "dd/MMMM/yy, h:mm a");
  }

  fortmat(num: number) : string{
    return this.currencyPipe.transform(num);
  }

  cargarDetalle(idInversion: number){
    this.totalVsDisp = 0;
    this.totalVsVendido = 0;
    this.totalCaja = 0;
    this.totalVsDeuda = 0;
    this.totalDeuda = 0;
    this.totalEsperado = 0;
    this.ventaService.obtenerDetalleReporte(idInversion).subscribe(data =>{
      this.calcularTotales(data);
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

  totalVasDisp(){

  }

}
