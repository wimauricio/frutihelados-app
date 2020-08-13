export class ReporteDTO{
    public idInversion : number;
	public totalInversion : number;
	public fechaInversion : Date;
    public vasosDispoInversion : number;
    
	public idHeladoDisponible : number;
	public sabor : string;
	public cantidadVasosDisponibles : number;
	public cantidadVasosVendidos : number;
	public valorVasoUnidad : number;
	public totalEnCaja : number;
	public cantidadVasosVendidosEnDeuda : number;
	public totalVasosVendidosDeuda : number;
	public totalDineroEsperado : number;
}