import { ReporteDTO } from './../_model/reporteDTO';
import { Venta } from './../_model/venta';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url: string =   `${HOST}/ventas`;
  ventaAdd = new Subject<Venta>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { }

  registrarVenta(ventas: Venta[]){
    return this.http.post(this.url, ventas);
  }

  listarDeudores(){
    return this.http.get<Venta[]>(`${this.url}/deuda`);
  }

  actualizarDeudores(ventas: Venta){
    return this.http.put(`${this.url}/deuda`, ventas);
  }

  obtenerReporte(){
    return this.http.get<ReporteDTO[]>(`${this.url}/reporte`);
  }

  obtenerDetalleReporte(idInversion: number){
    return this.http.get<ReporteDTO[]>(`${this.url}/reporte/${idInversion}`);
  }
}
