import { Component, OnInit, Inject } from '@angular/core';
import { DialogModule, Message } from 'primeng/primeng';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ContratoService } from '../services/contrato.service';
import { RueService } from '../services/rue.service';
import { UtilService } from '../services/util.service';
import { AddendumComponent } from '../addendum/addendum.component';
import { DetalleContratoComponent } from '../detalle-contrato/detalle-contrato.component';
import { HistorialEstadosComponent } from '../historial-estados/historial-estados.component';
import { APP_CONFIG, AppConfig } from '../app-config.module';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
	selector: 'busqueda-contrato',
	templateUrl: './busqueda-contrato.component.html',	
	styleUrls: ['./busqueda-contrato.component.css'], 
	providers: [AddendumComponent, DetalleContratoComponent, HistorialEstadosComponent]

})

export class BusquedaContratoComponent implements OnInit {
	anio:any;
	anioActual:any;
	anios:Array<any>;
	contratos:Array<any>;
	contratosSeleccionados: Array<any>;
	data:{};
	estados:Array<any>;
	estado:any;
	
	display: boolean = false;
	displayAnular:boolean = false;
	displayDesechar: boolean = false;
	displayRescindir:boolean = false;
	idContrato: number;
	fecha_hoy:Date;
	renglon:any;	
	numeroContrato:string;
	numeroFianza:string;
	msgs: Message[] = [];
	observacion:string;
	renglones: any;
	showLoader:boolean;


	private alive: boolean;
	private interval: number;

	constructor(private rueService:RueService, private utilService: UtilService,private modalService: NgbModal,
		@Inject(APP_CONFIG) private config: AppConfig, private contratoService: ContratoService ) {
		this.anios = new Array();
		this.fecha_hoy = new Date();
		this.anioActual =  this.fecha_hoy.getFullYear();
		this.alive = true;
		this.interval = 60000;
		this.estado = null;
		this.renglon = null;
		this.showLoader = true;
		
	}

	ngOnInit() {
		
		this.cargaContratos();
		this.cargarRenglones();
		this.inicializaAnios();
		this.cargarEstados();
		this.refrescarTablaContratos();
		this.showLoader = false;				
	}

	anular(observacion:string){
		this.contratoService.anularContrato(this.idContrato, observacion,'X').subscribe( 
			response => {                                                      				
				if(response.code==200){
					this.limpiarModels();
					this.muestraMensaje('success',response.message);
					this.cargaContratos();
				}
				else
					this.muestraMensaje('error',response.message);   	
			},
			error => {this.muestraMensaje('error',error);
		}
		);
	}

	desecharShow(){
		this.displayDesechar =true;

	}

	desecharContrato(observacion:string){

		for(let c of this.contratosSeleccionados){
			console.log(c.idContrato);

			this.contratoService.anularContrato(c.idContrato, observacion,'D').subscribe( 
				response => {                                                      				
							if(response.code==200)										
								this.cargaContratos();
							else
								this.muestraMensaje('error',response.message);

				},
				error => {
							this.muestraMensaje('error',error);
					}
			);		
		}

		this.limpiarModels();
		
	}

	descargaMasiva(){

		for(let c of this.contratosSeleccionados){
			console.log(c.idContrato);
			window.open(this.config.ENDPOINT+'/bknRRHHContratos/rest/contrato/generar/'+c.idContrato);	
		}
		
	}


	ngOnDestroy(){
		this.alive = false; // switches your TimerObservable off
	}


	refrescarTablaContratos(){
		TimerObservable.create(0, this.interval)
		.takeWhile(() => this.alive)
		.subscribe(() => {
			this.cargaContratos();
		});
	}

	cambioAnio(){
		this.cargaContratos();
	}
	cambioEstado(){
		this.cargaContratos();
	}
	cambioRenglon(){
		this.cargaContratos();
	}

	cargaContratos(){
		this.contratoService.getContratos(this.anioActual,this.renglon,this.estado)
		.subscribe(result => {this.contratos = result; this.contratosSeleccionados = null },
			error => { var errorMessage = <any>error;
				console.log(errorMessage);
			}
			);
	}

	cargarRenglones(){

		this.rueService.getRenglones().subscribe(result =>{			
				this.renglones = result;
			},
			error => { var errorMessage = <any>error;
				console.log(errorMessage);
			}
			);
	}

	cargarEstados(){

		this.contratoService.getEstados().subscribe(result => {
			this.estados = result;
		},
			error => { var errorMessage = <any>error;
				console.log(errorMessage);
			}
			);
	}

	downloadContrato(contrato){
		window.open(this.config.ENDPOINT+'/bknRRHHContratos/rest/contrato/generar/'+contrato.idContrato);
	}

	getClass(estado){

		switch(estado){
			case 1:return "morado text-white";
			case 2:return "bg-primary text-white";
			case 3:return "bg-danger text-white";
			case 4:return "bg-warning text-white";
			case 5:return "bg-success text-white";
			case 6:return "bg-success text-white";
		}
	}

	getNombreEstado(estado){
		switch(estado){
			case 1:return "Fianza";
			case 2:return "Pendiente";
			case 3:return "Rechazado";
			case 4:return "Aceptado";
			case 5:return "Aprobado";
			case 6:return "Addendum";
		}
	}

	puedeDescargar(contrato){
		switch(contrato.idCatalogoEstado){
			case 1: ;
			case 2: ;
			case 3: return true;
			default: false;
		}
	}

	openAddendumModal(idContrato:number){		
		let options: NgbModalOptions = {	size: 'lg' };

		const modalRef = this.modalService.open(AddendumComponent,options);
		modalRef.componentInstance.idContrato=idContrato;
		modalRef.result.then((result) =>{
			console.log('resultad9',result);

		}, (reason) => {
			console.log(reason);
		});
	}

	openDetalleModal(contrato){

		if(contrato.idCatalogoEstado!=3)
			this.showDetalle(contrato);
		else
			this.showHistoricoEstados(contrato.idContrato);
	}

	showDetalle(contrato){
		let options: NgbModalOptions = {	size: 'lg' };

		const modalRef = this.modalService.open(DetalleContratoComponent,options);
		modalRef.componentInstance.data=contrato;
		modalRef.result.then((result) =>{								        

		}, (reason) => {
			console.log(reason);
		});
	}

	showHistoricoEstados(idContrato){
		let options: NgbModalOptions = {	size: 'lg' };

		const modalRef = this.modalService.open(HistorialEstadosComponent,options);
		modalRef.componentInstance.idContrato = idContrato;
		modalRef.result.then((result) =>{

		}, (reason) => {
			console.log(reason);
		});
	}

	inicializaAnios(){	
		this.anios = this.utilService.getAnios((this.anioActual-3),(this.anioActual));
	}

	registrarFianza(){
		this.contratoService.registrarNumeroFianza(this.idContrato, this.numeroFianza)
		.subscribe( 
			response => {

				if(response.code==200){
					this.limpiarModels();
					this.muestraMensaje('success',response.message);
					this.cargaContratos();
				}
				else
					this.muestraMensaje('error',response.message);   	
			},
			error => {this.muestraMensaje('error',error);}
			);
	}

	

	rescindir(fechaFin,observacion){

		let fecha:string = fechaFin.day+'/'+fechaFin.month+'/'+fechaFin.year;

		this.contratoService.rescindirContrato(this.idContrato,fecha,observacion).subscribe( 
			response => {                                                      				
				if(response.code==200){
					this.limpiarModels();
					this.muestraMensaje('success',response.message);
					this.cargaContratos();
				}
				else
					this.muestraMensaje('error',response.message);   	
			},
			error => {this.muestraMensaje('error',error);
		}
		);
	}

	limpiarModels(){

		this.displayAnular=false;
		this.displayDesechar = false;
		this.display=false;		
		this.displayRescindir = false;
		this.idContrato=null;
		this.numeroContrato=null;
		this.observacion = null;
	}

	muestraMensaje(tipoMensaje, message){
		this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
	}

	showAnular(contrato){  		
		this.idContrato = contrato.idContrato;  			
		this.displayAnular=true;
	}

	showIngresoFianza(idContrato:number, numeroContrato:string, numeroFianza:string, 
		idCatalogoEstado:number) {
		
		if(idCatalogoEstado==1||idCatalogoEstado==2||idCatalogoEstado==3){
			this.numeroContrato = numeroContrato;
			this.idContrato = idContrato;
			this.numeroFianza = numeroFianza;
			this.display = true;
		}
	}

	showRescindir(contrato){
		this.idContrato = contrato.idContrato;
		this.numeroContrato = contrato.numeroContrato
		this.displayRescindir=true;
	}

}
