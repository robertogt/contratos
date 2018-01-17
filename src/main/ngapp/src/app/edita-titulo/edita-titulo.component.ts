import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { RueService } from '../services/rue.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-edita-titulo',
  templateUrl: './edita-titulo.component.html'
})
export class EditaTituloComponent implements OnInit {

	@Input() data: any ={};
	
	
	

  	constructor(private rueService:RueService, private activeModal:NgbActiveModal,
  				private utilService: UtilService) { }

  	ngOnInit() {
  			this.cargarData();
  	}

  	cargarData(){
      
      if(this.data.profesion ==null)
      		this.data.profesion = this.data.nombreTitulo;

    }

    editar(){
    	let datos = {
    					titulo: this.data.titulo,
    					profesion: this.data.profesion
    				}
    	console.log('objeto al editar',datos);

    	this.rueService.editarProfesionTitulo(datos)
    			.subscribe(
      						response => {
      							console.log(response);
      							this.activeModal.dismiss(this.data.cui);
				      		},
				      		error => {
				      			console.log('error',error);				      					
				      		}
				      );
    	
    }

}
