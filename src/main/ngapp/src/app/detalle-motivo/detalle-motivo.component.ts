import { Component, OnInit, Input } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import {  NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detalle-motivo',
  templateUrl: './detalle-motivo.component.html'
})
export class DetalleMotivoComponent implements OnInit {

	@Input() idContratoEstado: any;
	motivos:{};

 constructor(private activeModal:NgbActiveModal, private contratoService: ContratoService) { }

 ngOnInit() {
  this.getMotivos();
}

cerrar(){      
  this.activeModal.dismiss();
}

getMotivos(){
  this.contratoService.getMotivosRechazo(this.idContratoEstado)
  .subscribe( result => {this.motivos = result; console.log(this.motivos)},
    error => { var errorMessage = <any>error;
      console.log(errorMessage);
    }
    );
}




}
