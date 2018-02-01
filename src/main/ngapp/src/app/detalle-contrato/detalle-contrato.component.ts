import { Component, OnInit, Input } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import { HistorialEstadosComponent } from '../historial-estados/historial-estados.component';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-detalle-contrato',
  templateUrl: './detalle-contrato.component.html',
  styleUrls: ['./detalle-contrato.component.css'],
  providers: [HistorialEstadosComponent]
})
export class DetalleContratoComponent implements OnInit {
	
	msgs: Message[] = [];
  actividades: {};

	@Input() idContrato: any;
  @Input() data:any;
  	constructor(private utilService:UtilService, private activeModal:NgbActiveModal,
                private modalService: NgbModal, 
                private contratoService: ContratoService) { }

  	ngOnInit() {
      this.cargarData()
  	}

    cargarData(){
      
      this.data.nombreServicio = this.data.tipoServicios=='P'?'Profesional':'Tecnico';
      this.getActividades();

    }

    getActividades(){
      this.contratoService.getActividadesContrato(this.data.idContrato)
                          .subscribe( result => {this.data.actividades = result},
                                      error => { var errorMessage = <any>error;
                                                  console.log(errorMessage);
                                                }
                            );
    }

  	cerrar(){      
  		this.activeModal.dismiss();
  	}

  	muestraMensaje(tipoMensaje, message){
    	this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
  	}

    showHistoricoEstados(){
    let options: NgbModalOptions = {  size: 'lg' };

    const modalRef = this.modalService.open(HistorialEstadosComponent,options);
    modalRef.componentInstance.idContrato = this.data.idContrato;
    modalRef.result.then((result) =>{
        console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

}
