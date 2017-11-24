import { Component, OnInit, Inject } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { NgbModal, NgbActiveModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
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
	anioActual:any;
	anios:Array<any>;
	contratos:Array<any>;
	renglon:any;
	fecha_hoy:Date;
	renglones: any;
	

	constructor(private rueService:RueService, private utilService: UtilService,private modalService: NgbModal,
		@Inject(APP_CONFIG) private config: AppConfig) {
		this.anios = new Array();
		this.fecha_hoy = new Date();
		this.anioActual =  this.fecha_hoy.getFullYear();
	}

	ngOnInit() {
		
		this.cargaContratos();
  		this.cargarRenglones();
		this.inicializaAnios();
		
	}

	cargaContratos(){

		this.contratos = [
		    {
		    "identificador": "RRHH-SP-001-2017",
		    "renglon": "029",
		    "honorarios": "12000.00",
		    "estado":"Rechazado",
		    "idContrato":31
		  },
		    {
		   "identificador": "RRHH-SP-002-2017",
		    "renglon": "184",
		    "honorarios": "12000.00",
		    "estado":"Aprobado",
		    "idContrato":18
		  }
		];

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
		if(estado=='Aprobado')
			return "bg-success text-white";
		else
			return "bg-danger text-white";
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

	openDetalleModal(idContrato:number){

		let options: NgbModalOptions = {	size: 'lg' };

    	const modalRef = this.modalService.open(DetalleContratoComponent,options);
    	modalRef.componentInstance.idContrato=idContrato;
    	modalRef.result.then((result) =>{
								        console.log('resultad9',result);
								        
								    }, (reason) => {
								       		console.log(reason);
								    });
	}

	inicializaAnios(){	
    	this.anios = this.utilService.getAnios((this.anioActual-3),(this.anioActual));
	}

	cambioAnio(){

	}




}
