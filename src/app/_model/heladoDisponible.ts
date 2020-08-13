import { Inversion } from './inversion';
import { Sabor } from './sabor';
export class HeladoDisponible{
    public id : number;
    public sabor: Sabor;
    public inversion : Inversion;
    public cantidadVasosPreparados : number;
    public cantidadVasosDispobibles : number;
    public valorVasoUnidad : number;
    public fecha: string;
    public idInversion: number;

}