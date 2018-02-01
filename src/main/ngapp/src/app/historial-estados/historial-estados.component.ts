import { Component, OnInit, Input } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DetalleMotivoComponent } from '../detalle-motivo/detalle-motivo.component';
import { ConfirmationService,ConfirmDialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-historial-estados',
  templateUrl: './historial-estados.component.html',
  styleUrls: ['./historial-estados.component.css'],
  providers: [ConfirmationService, ConfirmDialogModule]
})
export class HistorialEstadosComponent implements OnInit {

	@Input() idContrato: any;
	estados:{};
  motivos:{};
  display:boolean;
  constructor(private activeModal:NgbActiveModal
    ,private contratoService: ContratoService
    ,private _modalService:NgbModal
    ,private confirmationService: ConfirmationService) 
  { }

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

  openMotivos(p_idContratoEstado:any) {


    let options: NgbModalOptions = {
      backdrop: 'static',
      keyboard:  false
    };
    
    const modalRef = this._modalService.open(DetalleMotivoComponent,options);
    modalRef.componentInstance.idContratoEstado = p_idContratoEstado;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    modalRef.result.then((result) => {
      console.log('result ');

    }, (reason) => {
      console.log('reason ');


    });    
  }

  showDialog(p_idContrato:any) {
     console.log(p_idContrato);
    this.contratoService.getMotivosRechazo(p_idContrato)
    .subscribe( result => {
        this.motivos = result; 
        console.log(result)
        this.display = true;
      },
      error => { var errorMessage = <any>error;
        console.log(errorMessage);
      }
      );
    
  }

  showConfirmar(idContrato){
    this.confirmationService.confirm({
            message: 'Esta seguro de devolver el contrato?',
            accept: () => {
                this.cambiarEstadoContrato(idContrato);              
            }
        });
  }

  cambiarEstadoContrato(idContrato){

    this.contratoService.actualizaEstados(idContrato).subscribe( 
      response => {
                  console.log(response);
                  this.activeModal.dismiss('devuelto');
      },
      error => {console.log(error);
              }
      );
  }

  downloadContratoRechazado(){
    this.contratoService.descargarDocumentoRechazado(this.idContrato);
  }

  getMotivos(idContratoEstado:any){
    this.contratoService.getMotivosRechazo(idContratoEstado)
    .subscribe( result => {this.motivos = result; console.log(this.motivos)},
      error => { var errorMessage = <any>error;
        console.log(errorMessage);
      }
      );
  }

}
