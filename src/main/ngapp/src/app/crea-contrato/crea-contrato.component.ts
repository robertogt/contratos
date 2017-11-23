import { Component, OnInit } from '@angular/core';
import { RueService } from '../services/rue.service';
import { Laboral } from '../model/laboral';
import { NgForm } from '@angular/forms';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './crea-contrato.component.html',
  styleUrls: ['./crea-contrato.component.css']
})
export class CreaContratoComponent implements OnInit {

	personas: any[];
	renglones: any[];
	ubicaciones: any[];
	colegios: any[];
	titulos: any[];
	perfiles: any[];
	actividades: any[];
  tiposServicios: any={};

  data: any={};
  infoAcademica: any={};

	contratista: any;
  fechaDel: any;
  fechaAl: any;
  renglon: any;
  tipoServicios: any;
	ubicacion: any={};
  idPerfil: any = null;
  fechaContrato: any;
  honorarios: any;
  estadoCivil: any;
  nacionalidad: any;
  dpi: any;
  nit: any;
  direccion: any;
  edad:any;
  academico: any;
  colegio: any;
	titulo: any={};
  numeroColegiado: any;  

  msgs: Message[] = [];
  message:string;
  severity:string;

  fechaMinima: any;
  fechaMaxima: any;

  contratoGuardado:boolean=false;

	constructor(private rueService:RueService) { }

	ngOnInit() {
    this.tiposServicios = [{value:'T',label:'Tecnicos'},{value:'P',label:'Profesionales'}]
		this.rueService.getRenglones().subscribe(renglones => this.renglones = renglones);
		this.rueService.getColegios().subscribe(colegios => this.colegios = colegios);
    var date = new Date();
    this.fechaMinima = { day: 1, month: 1, year: date.getUTCFullYear()};
    this.fechaMaxima = { day: 31, month: 12, year: date.getUTCFullYear()};
    
  }
  
  onSubmit(f: NgForm){

    if(!this.validaDatos())
      return;

    this.data.fechaDel = this.fechaDel.day+'/'+this.fechaDel.month+'/'+this.fechaDel.year;
    this.data.fechaAl = this.fechaAl.day+'/'+this.fechaAl.month+'/'+this.fechaAl.year;
    this.data.renglon = this.renglon;
    this.data.tipoServicios =  this.tipoServicios;
    this.data.ubicacionFuncional = this.ubicacion.idUbicacionFuncional;
    this.data.idPerfil = this.idPerfil;
    this.data.fechaCambioTipoMovimiento = this.fechaContrato.day+'/'+this.fechaContrato.month+'/'+this.fechaContrato.year;
    this.data.actividades = this.actividades;


    this.infoAcademica.academico = this.academico;
    this.infoAcademica.colegioProfesional = this.colegio;
    this.infoAcademica.titulo = this.titulo.titulo;
    this.infoAcademica.numeroColegiado = this.numeroColegiado;
    
    this.data.infoAcademica = this.infoAcademica;
    
    console.log('data',this.data);

    this.rueService.setContrato(this.data).subscribe( 
                                                      response => {console.log(response),
                                                                   //this.limpiarForm(f);
                                                                   this.muestraMensaje('success','Contrato creado');
                                                                   this.contratoGuardado=true;
                                                                 },
                                                      error => {this.muestraMensaje('error',error);
                                                                this.contratoGuardado=false;}
                                                     );
  }

  cargaDatos(data){

    this.estadoCivil = data.estadoCivilLetras;
    this.nacionalidad = data.nacionalidad;
    this.dpi = data.dpi;
    this.nit = data.nit;
    this.direccion = data.direccion;
    this.edad = data.edad;
    this.renglon = data.renglon;
    this.tipoServicios = data.tipoServicios;
    this.idPerfil = data.iPerfil;
    this.ubicacion.idUbicacionFuncional = data.ubicacionFuncional;
    (<HTMLInputElement>document.getElementById("ubica")).value = data.nombreUbicacion;

    if(this.ubicacion.idUbicacionFuncional !=undefined)
      this.getPerfiles();

    if (this.tipoServicios == 'T') {
      this.numeroColegiado = null;
      this.colegio =null;
    }

    if(data.infoAcademica !=undefined){
      
      this.academico = data.infoAcademica.academico;
      this.colegio = data.infoAcademica.colegioProfesional;
      this.titulo.titulo = data.infoAcademica.titulo;
      (<HTMLInputElement>document.getElementById("titu")).value = data.infoAcademica.nombreTitulo;
      this.numeroColegiado = data.infoAcademica.numeroColegiado;
    }else
    {
      this.titulo=null;
    }

  }

  cargaDatosDelFuncionario(data){
    
    if (data.code!=200)
      this.muestraMensaje('error',data.message);    
    else{
      this.data = data.data;
      this.cargaDatos(this.data);
    }

  }

  descargarPDF(){
    console.log('descargar');
  }

  getActividades(perfil){

      this.rueService
      .getActividadesPorPerfil(perfil,this.data.idRue)
      .subscribe(  actividades => {this.actividades = actividades; console.log(this.actividades)},
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

  limpiarForm(f:NgForm){
    f.reset();
    this.perfiles = [];
    this.actividades = [];
  }

  muestraMensaje(tipoMensaje, message){
      this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
  }

  onChangeColegio(){
    this.academico=null;    
  }

  onChangeNumeroColegiado(){
    this.academico=null;
  }

  onChangeTitulo(){
    this.academico=null;
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

  searchTitulo(event) {
        this.rueService
        .getTitulos(event.query)
        .subscribe(	titulos => {this.titulos = titulos;},
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  }

	seleccionaContratista(){
      this.rueService
      .getFuncionario(this.contratista.dpi)
      .subscribe(  data => {console.log('data',data); this.inicializaLaboral(data);},
                error => { var errorMessage = <any>error; console.log(errorMessage);});
  }

  seleccionaFechaDel(){
      this.fechaContrato = this.fechaDel;
  }

  seleccionaUbicacion(){
  		this.getPerfiles();
  }

  selectPerfil(perfil){
      this.idPerfil = perfil.idPerfil;
  		this.getActividades(this.idPerfil);
  }

  validaDatos(){

    if(this.idPerfil == null){
      this.muestraMensaje('error','Seleccione un perfil');
      return false;
    }

    let actividadSeleccionada:boolean=false;
    for (var i = this.actividades.length - 1; i >= 0; i--) {      
      if(this.actividades[i].seleccionado)
        actividadSeleccionada = this.actividades[i].seleccionado;
    }
    if(!actividadSeleccionada){
      this.muestraMensaje('error','Seleccione al menos una actividad');
      return false;
    }

    if(this.data.dpi == null){
      this.muestraMensaje('error','Seleccione un contratista');
      return false;
    }
    
    if(this.titulo.titulo == null){
      this.muestraMensaje('error','Seleccione un titulo');
      return false;
    }

    return true;
  }
 
}
