import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { RueService } from '../services/rue.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-edita-persona',
  templateUrl: './edita-persona.component.html',
  styleUrls: ['./edita-persona.component.css']
})
export class EditaPersonaComponent implements OnInit {

	@Input() idRue: any;
	departamento: any;
	departamentos: any;
	data: any={};
	fechaNacimiento:any;
	municipio: any;
	municipios: any;
	zonaVivienda: any;

  	constructor(private rueService:RueService, private activeModal:NgbActiveModal,
  				private utilService: UtilService) { }

  	ngOnInit() {
  			this.cargarData();
  	}

  	cargarData(){
      
      console.log(this.idRue);
      this.getDepartamentos();

    }

    getDepartamentos(){
    	this.rueService.getDepartamentos()
      					.subscribe(data => { this.departamentos= data;
      										this.getDatosEmpleado(this.idRue);
      									} 
      							);
    }

    getMunicipios(departamento, municipio){
    	this.rueService.getMunicipios(departamento)
      					.subscribe(data => {
      											this.municipios= data;
      											this.municipio = municipio;      											
      									}
      					);
    }

    getDatosEmpleado(idRue){
    	this.rueService.getEmpleado(idRue)
      					.subscribe(data => {this.data = data.data;
      						let fecha = new Date(this.data.fechaNacimiento);
      						this.fechaNacimiento = this.utilService.getDateObject(fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear());
      						this.departamento = this.data.departamentoVivienda;
      						this.getMunicipios(this.departamento, this.data.municipioVivienda);      						
      						console.log('data',data);
      						}
      					);	
    }

    editar(){
    	let datos = {
    					idRue: this.data.idRue,
    					genero: this.data.genero,
		               	direccion: this.data.direccion,
		               	municipioVivienda: this.municipio,
		               	departamentoVivienda: this.departamento,
		               	zonaVivienda: this.data.zonaVivienda,
		               	estadoCivil: this.data.estadoCivil,
		               	fechaNacimiento: new Date(this.fechaNacimiento.year,
		               								(this.fechaNacimiento.month-1),
		               								this.fechaNacimiento.day)
    				}
    	console.log(datos);

    	this.rueService.editarRue(datos)
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

    onChangeDepartamento(){
    	console.log(this.departamento);
    	this.getMunicipios(this.departamento,0);
    }

}
