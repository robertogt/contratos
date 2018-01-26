import { APP_CONFIG, AppConfig } from '../app-config.module';
import { Component, OnInit, Inject } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import { DialogModule, Message } from 'primeng/primeng';
import { RueService } from '../services/rue.service';
import { UtilService } from '../services/util.service';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-solicitud-gasto',
  templateUrl: './solicitud-gasto.component.html',
  styleUrls: ['./solicitud-gasto.component.css']
})
export class SolicitudGastoComponent implements OnInit {
	anioActual:any;
	anios:Array<any>;
	contratos:Array<any>;
	contratosSeleccionados: Array<any>;
	data:{};
	estados:Array<any>;
	estado:any;
	fechaSolicitud: any;	
	fechaHoy:Date;
	idContrato: number;
	msgs: Message[] = [];
	observacion:string;	
	renglon:any;	
	renglones: any;
	tiposServicio:any;
	showLoader:boolean;
	private alive: boolean;
	private interval: number;
	 
	constructor(private rueService:RueService, private utilService: UtilService,
		@Inject(APP_CONFIG) private config: AppConfig, private contratoService: ContratoService) { 
		this.anios = new Array();
		this.fechaHoy = new Date();
		this.fechaSolicitud = { day: this.fechaHoy.getDate(),
								month: this.fechaHoy.getMonth()+1, 
								year: this.fechaHoy.getUTCFullYear()};

		this.anioActual =  this.fechaHoy.getFullYear();
		this.alive = true;
		this.interval = 60000;
		this.estado = 5;
		this.renglon = null;
	}

	ngOnInit() {
		
		this.cargaTiposServicios();
		this.cargarRenglones();
		this.inicializaAnios();
		this.cargarEstados();
		this.refrescarTablaContratos();
		this.cargaContratos();
		this.showLoader = false;		
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
		.subscribe(result => {	this.contratos = result; 
								this.contratosSeleccionados = null },
			error => { var errorMessage = <any>error;
				console.log(errorMessage);
			}
			);
	}


	cargarRenglones(){

		this.renglones = [{"nombre":"184","renglon":"4"},
						  {"nombre":"186","renglon":"5"},
						  {"nombre":"188","renglon":"6"},
						  {"nombre":"189","renglon":"9"},
						  {"nombre":"183","renglon":"3"}];		
	}

	cargaTiposServicios(){
		this.tiposServicio = [	{"label":"Todos","value":null},
								{"label":"Profesional","value":"P"},
							  	{"label":"Tecnico","value":"T"}
							 ];
	}

	cargarEstados(){

		this.estados = [{"idCatalogoEstado":5,"nombre":"Aprobado"},
						{"idCatalogoEstado":7,"nombre":"Solicitud De Gasto"}]		
	}

	downloadSolicitud(contrato){
		this.showLoader = false;

		let fechaFormulario = this.fechaSolicitud.day+"/"+this.fechaSolicitud.month+"/"+this.fechaSolicitud.year;

			this.contratoService.registrarSolicitudDeGasto(contrato.idContrato,fechaFormulario).subscribe( 
		      response => {
		      						      				
		      				window.open("http://cgcbi.contraloria.gob.gt:9704/xmlpserver/%2FRRHH%2FSOLICITUD_DEL_GASTO%2FRPT_SOLICITUD_DE_GASTO.xdo?id=consulta&passwd=cgc20130bi&_xpf=&_xpt=1&_xt=Default&_xf=pdf&P_ID_CONTRATO="+contrato.idContrato,"_blank");
		        			this.showLoader = false;
		        			this.cargaContratos();
		      },
		      error => {this.muestraMensaje('error',error);
		                this.showLoader = false;
		              }
		    );
	}

	descargaMasiva(){
		for(let c of this.contratosSeleccionados){
			this.downloadSolicitud(c);
		}
	}

	getClass(estado){

		switch(estado){			
			case 5:return "bg-primary text-white";
			case 7:return "bg-success text-white";			
		}
	}

	getNombreEstado(estado){
		switch(estado){
			case 5:return "Aprobado";
			case 7:return "Solicitud";
		}
	}

	inicializaAnios(){	
		this.anios = this.utilService.getAnios((this.anioActual-3),(this.anioActual));
	}

	muestraMensaje(tipoMensaje, message){
    	this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
  	}

	refrescarTablaContratos(){
		TimerObservable.create(0, this.interval)
		.takeWhile(() => this.alive)
		.subscribe(() => {
			this.cargaContratos();
		});
	}

	

}
