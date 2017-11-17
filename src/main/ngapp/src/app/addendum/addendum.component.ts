import { Component, OnInit } from '@angular/core';
import { RueService } from '../services/rue.service';
import { Laboral } from '../model/laboral';
import { NgForm } from '@angular/forms';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrls: ['./addendum.component.css']
})
export class AddendumComponent implements OnInit {

	actividades: any[];
	contratista: any;
	data: any={};
	fechaDel: any;
  	fechaAl: any;
  	idPerfil: any = null;
  	msgs: Message[] = [];
  	perfiles: any[];
  	personas: any[];
  	renglon: any;
	renglones: any[];
	tipoServicios: any;
	tiposServicios: any[];
	ubicacion: any={};
	ubicaciones: any[];
  	
  	constructor(private rueService:RueService) { }

  	ngOnInit() {
  		this.tiposServicios = [{value:'T',label:'Tecnicos'},{value:'P',label:'Profesionales'}]
		this.rueService.getRenglones().subscribe(renglones => this.renglones = renglones);
  	}

  	cargaDatos(data){

	    this.renglon = data.renglon;
	    this.tipoServicios = data.tipoServicios;
	    this.idPerfil = data.iPerfil;
	    this.ubicacion.idUbicacionFuncional = data.ubicacionFuncional;
	    (<HTMLInputElement>document.getElementById("ubica")).value = data.nombreUbicacion;
	    this.getPerfiles();
  	}

  	cargaDatosDelFuncionario(data){
    
    if (data.code!=200)
      this.muestraMensaje('error',data.message);    
    else{
      	this.data = data.data;
      	this.cargaDatos(this.data);
    	}

	}

	getActividades(perfil){

      this.rueService
      .getActividadesPorPerfil(perfil,this.data.idRue)
      .subscribe(  actividades => {this.actividades = actividades;},
                error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

	getPerfiles(){
    
  		this.rueService
  		.getPerfilesPorUbicacion(this.ubicacion.idUbicacionFuncional)
  		.subscribe(	perfiles => { this.perfiles = perfiles;
                                this.actividades = [];
                                
                                if(this.data.actividades != undefined)
                                {
                                  this.actividades = this.data.actividades;
                                }
                              },
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

  	inicializaLaboral(data){
    	this.cargaDatosDelFuncionario(data);    
  	}

  	muestraMensaje(tipoMensaje, message){
      this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
  	}

  	search(event) {
        this.rueService
        .getPersonas(event.query)
        .subscribe(	result => { this.personas = result;}, 
        			error => {var errorMessage = <any>error;console.log(errorMessage);});
	}

	searchUbicacion(event) {
        this.rueService
        .getUbicacionesFuncionales(event.query)
        .subscribe(	ubicaciones => {this.ubicaciones = ubicaciones;},
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

	seleccionaContratista(){
      this.rueService
      .getFuncionario(this.contratista.dpi)
      .subscribe(  data => {console.log('data',data); this.inicializaLaboral(data);},
                error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

  	selectPerfil(perfil){
      this.idPerfil = perfil.idPerfil;
  		this.getActividades(this.idPerfil);
  	}
  	
  	seleccionaUbicacion(){
  		this.getPerfiles();
  	}

}
