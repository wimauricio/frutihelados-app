import { InversionDTO } from './../_model/inversionDTO';
import { HeladoDisponible } from './../_model/heladoDisponible';
import { IngredienteInversion } from './../_model/ingredienteInversion';
import { Inversion } from './../_model/inversion';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InversionService {
  url: string =   `${HOST}/inversiones`;
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { }


  listarInversiones(){
    return this.http.get<Inversion[]>(this.url);
  }

  listarIngredientesPorInversion(idInversion: number){
    return this.http.get<IngredienteInversion[]>(`${this.url}/inversion/${idInversion}`);
  }

  listarHeladosDisponiblesPorInversion(idInversion: number){
    return this.http.get<HeladoDisponible[]>(`${this.url}/heladosDisponibles/${idInversion}`);
  }

  actualizarIngredienteInversion(ingredienteInversion: IngredienteInversion){
    return this.http.put(this.url, ingredienteInversion);
  }

  eliminarIngredienteInversion(ingredienteInversion: IngredienteInversion){
    return this.http.delete(`${this.url}/ingredienteDelete/${ingredienteInversion.id},${ingredienteInversion.inversion.id}`);
  }

  actualizarHeladoDisponible(heladoDisponible: HeladoDisponible){
    return this.http.put(`${this.url}/actualizarHeladosDisponibles`, heladoDisponible);
  }

  guardar(inversionDTO: InversionDTO){
    return this.http.post(this.url, inversionDTO);
  }
}
