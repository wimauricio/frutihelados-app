import { Deudor } from './deudor';
import { HeladoDisponible } from './heladoDisponible';
export class Venta{
    public id: number;
    public fecha: string;
    public heladoDisponible: HeladoDisponible;
    public cantidadVasosVendidos: number;
    public pago : boolean;
    public deudor: Deudor;
}