import { HeladoDisponible } from './../_model/heladoDisponible';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Sabor } from './../_model/sabor';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaborService {
  url: string =   `${HOST}/sabores`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Sabor[]>(this.url);
  }

  listarHeladoDIsponible(){
    return this.http.get<HeladoDisponible[]>(`${this.url}/disponibles`);
  }

  registrar(sabor:Sabor){
    return this.http.post(this.url, sabor);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
