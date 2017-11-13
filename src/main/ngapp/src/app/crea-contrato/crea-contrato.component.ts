import { Component, OnInit } from '@angular/core';
import {RueService} from '../services/rue.service';


@Component({
  selector: 'app-root',
  templateUrl: './crea-contrato.component.html',
  styleUrls: ['./crea-contrato.component.css']
})
export class CreaContratoComponent implements OnInit {

	results: any[];
	renglones: any[];
	ubicaciones: any[];
	colegios: any[];
	titulos: any[];
	perfiles: any[];
	actividades: any[];

	contratista:any;
	ubicacion:any;
	titulo:any;
  fechaContrato:any;
  fechaInicio: any;
	success:string ='text-success' ;
	contratoGuardado:boolean =true;


	constructor(private rueService:RueService) { }

	ngOnInit() {		
		this.rueService.getRenglones().subscribe(renglones => this.renglones = renglones);
		this.rueService.getColegios().subscribe(colegios => this.colegios = colegios);		
  	}

	getPerfiles(){
  		this.rueService
  		.getPerfilesPorUbicacion(this.ubicacion.idUbicacionFuncional)
  		.subscribe(	perfiles => {this.perfiles = perfiles;},
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

  	getActividades(perfil){
  		console.log(perfil);

  		this.rueService
  		.getActividadesPorPerfil(perfil.idPerfil,1558)
  		.subscribe(	actividades => {this.actividades = actividades; console.log(this.actividades)},
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

  	search(event) {
        this.rueService
        .getPersonas(event.query)
        .subscribe(	result => { this.results = result;}, 
        			error => {var errorMessage = <any>error;console.log(errorMessage);});
  	}

  	searchUbicacion(event) {
        this.rueService
        .getUbicacionesFuncionales(event.query)
        .subscribe(	ubicaciones => {this.ubicaciones = ubicaciones;},
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

  	searchTitulo(event) {
        this.rueService
        .getTitulos(event.query)
        .subscribe(	titulos => {this.titulos = titulos;},
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  	}

	  seleccionaContratista(){
  		console.log(this.contratista);  		
  	}

    seleccionaFechaInicio(){
      this.fechaContrato = this.fechaInicio;
    }

  	seleccionaUbicacion(){
  		this.getPerfiles();
  	}

  	selectPerfil(perfil){
  		this.getActividades(perfil);
  	}

 
}
