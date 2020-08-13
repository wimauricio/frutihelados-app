import { HeladoDisponible } from './heladoDisponible';
import { IngredienteInversion } from './ingredienteInversion';
export class InversionDTO{
    public listaIngredienteInversion : IngredienteInversion[];
    public listaHeladoDisponibles : HeladoDisponible[];
    public fecha: string;
}