import { Component, OnInit, Input } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historial-estados',
  templateUrl: './historial-estados.component.html',
  styleUrls: ['./historial-estados.component.css']
})
export class HistorialEstadosComponent implements OnInit {

	@Input() idContrato: any;
	estados:{};

  	constructor(private activeModal:NgbActiveModal, private contratoService: ContratoService) { }

  	ngOnInit() {
  		this.getEstados();
  	}

  	cerrar(){      
  		this.activeModal.dismiss();
  	}

  	getEstados(){
     	this.contratoService.getEstadosHistorial(this.idContrato)
                          .subscribe( result => {this.estados = result; console.log(this.estados)},
                                      error => { var errorMessage = <any>error;
                                                  console.log(errorMessage);
                                                }
                            );
    }

    getNombreEstado(estado:number){
    	switch(estado){
    		case 2: return 'Pendiente de revisión';
    		case 3: return 'Rechazado';
    		case 4: return 'Aceptado';
    	}
    }

    

  	downloadContratoRechazado(){
		this.contratoService.descargarDocumentoRechazado(this.idContrato);
	}

}
