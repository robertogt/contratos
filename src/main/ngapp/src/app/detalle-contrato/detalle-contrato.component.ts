import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-detalle-contrato',
  templateUrl: './detalle-contrato.component.html',
  styleUrls: ['./detalle-contrato.component.css']  
})
export class DetalleContratoComponent implements OnInit {

	data: any={};
	msgs: Message[] = [];


	@Input() idContrato: any;
  	constructor(private utilService:UtilService, private activeModal:NgbActiveModal) { }

  	ngOnInit() {
  	}

  	cerrar(){      
  		this.activeModal.dismiss();
  	}

  	muestraMensaje(tipoMensaje, message){
    	this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
  	}

}
