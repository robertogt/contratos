import { Component, OnInit, Inject } from '@angular/core';
import { DialogModule, Message } from 'primeng/primeng';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ContratoService } from '../services/contrato.service';
import { RueService } from '../services/rue.service';
import { UtilService } from '../services/util.service';
import { AddendumComponent } from '../addendum/addendum.component';
import { DetalleContratoComponent } from '../detalle-contrato/detalle-contrato.component';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Component({
	selector: 'busqueda-contrato',
	templateUrl: './busqueda-contrato.component.html',
	providers: [AddendumComponent, DetalleContratoComponent]
	})

export class BusquedaContratoComponent implements OnInit {
	anio:any;
	anioActual:any;
	anios:Array<any>;
	contratos:Array<any>;
	data:{};
	display: boolean = false;
	idContrato: number;
	renglon:any;
	numeroContrato:string;
	numeroFianza:string;
	msgs: Message[] = [];
	fecha_hoy:Date;
	renglones: any;
	

	constructor(private rueService:RueService, private utilService: UtilService,private modalService: NgbModal,
		@Inject(APP_CONFIG) private config: AppConfig, private contratoService: ContratoService ) {
		this.anios = new Array();
		this.fecha_hoy = new Date();
		this.anioActual =  this.fecha_hoy.getFullYear();
	}

	ngOnInit() {
		
		this.cargaContratos();
  		this.cargarRenglones();
		this.inicializaAnios();
		
	}

	cambioAnio(){
		this.cargaContratos();
	}

	cargaContratos(){

		this.contratoService.getContratos(this.anioActual)
							.subscribe(result => {this.contratos = result, console.log(result)},
            								   error => { var errorMessage = <any>error;
              											   console.log(errorMessage);
            											}
      											);
	}

	cargarRenglones(){

		this.rueService.getRenglones().subscribe(result => {this.renglones = result;},
            								   error => { var errorMessage = <any>error;
              											   console.log(errorMessage);
            											}
      											);
	}

	downloadContrato(contrato){
		window.open(this.config.ENDPOINT+'/bknRRHHContratos/rest/contrato/generar/'+contrato.idContrato)
	}

	editar(contrato){
		console.log(contrato);		
	}

	getClass(estado){

		switch(estado){
			case 1:return "bg-mutted text-white";
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

	onRowSelect(row){
	}

	openAddendumModal(idContrato:number){
		console.log(idContrato);
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

		let options: NgbModalOptions = {	size: 'lg' };

    	const modalRef = this.modalService.open(DetalleContratoComponent,options);
    	modalRef.componentInstance.data=contrato;
    	modalRef.result.then((result) =>{
								        console.log('resultad9',result);
								        
								    }, (reason) => {
								       		console.log(reason);
								    });
	}

	inicializaAnios(){	
    	this.anios = this.utilService.getAnios((this.anioActual-3),(this.anioActual));
	}

	registrarFianza(){
		console.log(this.numeroFianza);
		this.contratoService.registrarNumeroFianza(this.data).subscribe( 
                                                      response => {console.log(response),
                                                                   this.limpiarFianza();
                                                                   this.muestraMensaje('success','Contrato creado');
                                                                 },
                                                      error => {this.muestraMensaje('error',error);
                                                                }
                                                     );
		//console.log(this.labora);
	}		

	limpiarFianza(){
		this.numeroContrato=null;
		this.idContrato=null;
		//this.display=false;
	}

	muestraMensaje(tipoMensaje, message){
      this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
  	}

	showIngresoFianza(idContrato:number, numeroContrato:string, numeroFianza:string) {
		this.numeroContrato = numeroContrato;
		this.idContrato = idContrato;
		this.numeroFianza = numeroFianza;
        this.display = true;
    }

}
