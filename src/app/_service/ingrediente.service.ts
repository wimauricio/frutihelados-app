import { Ingrediente } from './../_model/ingrediente';
import { HOST } from './../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  url: string =   `${HOST}/ingredientes`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Ingrediente[]>(this.url);
  }

  registrar(ingrediente:Ingrediente){
    return this.http.post(this.url, ingrediente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
