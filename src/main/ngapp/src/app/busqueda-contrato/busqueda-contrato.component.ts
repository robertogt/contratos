import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { NgbModal, NgbActiveModal,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RueService } from '../services/rue.service';
import { UtilService } from '../services/util.service';
import { AddendumComponent } from '../addendum/addendum.component';


@Component({
	selector: 'busqueda-contrato',
	templateUrl: './busqueda-contrato.component.html',
	providers: [AddendumComponent]
	})

export class BusquedaContratoComponent implements OnInit {
	anioActual:any;
	anios:Array<any>;
	contratos:Array<any>;
	renglon:any;
	fecha_hoy:Date;
	renglones: any;
	

	constructor(private rueService:RueService, private utilService: UtilService,private modalService: NgbModal) {
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
		    "idContrato":11
		  },
		    {
		   "identificador": "RRHH-SP-002-2017",
		    "renglon": "184",
		    "honorarios": "12000.00",
		    "estado":"Aprobado",
		    "idContrato":11
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

	getClass(estado){
		if(estado=='Aprobado')
			return "bg-success text-white";
		else
			return "bg-danger text-white";
	}

	onRowSelect(row){
	}

	openAddendumModal(content,data){
		let options: NgbModalOptions = {	
											size: 'lg'
    									};

    	const modalRef = this.modalService.open(AddendumComponent,options);
    	modalRef.componentInstance.idContrato=11;
    	modalRef.result.then((result) =>{
								        console.log('resultad9',result);
								        console.log('modalRef',modalRef);
								        
								    }, (reason) => {
								       		console.log(reason);


								    });
	}

	inicializaAnios(){	
    	this.anios = this.utilService.getAnios((this.anioActual-3),(this.anioActual+1));
	}

	cambioAnio(){

	}




}
