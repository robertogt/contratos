import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditaPersonaComponent } from '../edita-persona/edita-persona.component'
import { EditaTituloComponent } from '../edita-titulo/edita-titulo.component'
import { RueService } from '../services/rue.service';
import { UtilService } from '../services/util.service';
import { ContratoService } from '../services/contrato.service';
import { Laboral } from '../model/laboral';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/primeng';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Component({
  selector: 'app-root',
  templateUrl: './crea-contrato.component.html',
  styleUrls: ['./crea-contrato.component.css']
})
export class CreaContratoComponent implements OnInit {

	actividades: any[];

  colegios: any[];
  contratista: any;
  data: any={};
  fechaDel: any;
  fechaAl: any;
  idContrato:any=null;
  infoAcademica: any={};
  perfiles: any[];
  personas: any[];
  profesion: any;
  renglones: any[];
  ubicaciones: any[];	  
  tiposServicios: any={};
  titulos: any[];
  
  renglon: any;
  tipoServicios: any;
  ubicacion: any={};
  param: any;
  
  idPerfil: any = null;

  fechaContrato: any;
  honorarios: any;
  estadoCivil: any;
  nacionalidad: any;
  nombreCompleto:string;
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
  showLoader:boolean = false;


  constructor(private rueService:RueService, private route: ActivatedRoute, 
    private contratoService:ContratoService, private utilService: UtilService,
    private modalService: NgbModal) 
  { }

  ngOnInit() {

    var date = new Date();
    this.tiposServicios = [{value:'T',label:'Tecnicos'},{value:'P',label:'Profesionales'}]
    this.fechaMinima = { day: 1, month: 1, year: date.getUTCFullYear()};
    this.fechaMaxima = { day: 31, month: 12, year: date.getUTCFullYear()};
    this.rueService.getColegios().subscribe(colegios => {this.colegios = colegios,this.inicializaRenglones()});

  }

  inicializaRenglones(){
    this.rueService.getRenglones().subscribe(renglones => {this.renglones = renglones, this.inicializaContrato()});
  }

  inicializaContrato(){
    this.param = this.route.params.subscribe(params => {
      this.idContrato = params['idContrato'];   
      if(this.idContrato!=undefined){          
        this.getContrato();          
      }
    });   
  }


  ngOnDestroy() {
    //this.param.unsubscribe();
  }
  
  onSubmit(f: NgForm){
    
    
    if(!this.validaDatos())
      return;

    this.showLoader = true;
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
    
    this.data.academico = this.infoAcademica;
    
    console.log('data',this.data);
    if(this.idContrato==undefined)
      this.insertContrato(this.data,f);
    else
      this.updateContrato(this.data,f);
  }

  

  insertContrato(data, f: NgForm){

    this.rueService.setContrato(data)
    .subscribe( 
      response => {console.log(response);

        if(response.code == 200){
          this.limpiarForm(f);
          this.muestraMensaje('success',response.message);
          this.contratoGuardado=true;
          this.idContrato = response.data.idContrato;

        }else{
          this.muestraMensaje('error',response.message);
        }
        this.showLoader = false;
      },
      error => {this.muestraMensaje('error',error);
      this.contratoGuardado=false;
      this.showLoader = false;
       }

      );
  }

  updateContrato(data, f: NgForm){
    this.contratoService.updateContrato(data).subscribe( 
      response => {console.log(response),
        this.limpiarForm(f);
        this.muestraMensaje('success','Contrato creado');
        this.contratoGuardado=true;
        this.showLoader = false;
      },
      error => {this.muestraMensaje('error',error);
                this.contratoGuardado=false;
                this.showLoader = false;
              }
      );
  }

  limpiarForm(f:NgForm){
    //f.reset();
    this.colegio = null;
    this.contratista = null;
    this.edad = null;
    this.estadoCivil = null;
    this.nacionalidad = null;
    this.dpi = null;
    this.nit = null;
    this.direccion = null;
    this.fechaContrato = null;
    this.data.honorario = null;
    this.fechaDel = null;
    this.fechaAl = null;
    this.numeroColegiado = null;
    this.ubicacion = {};
    this.perfiles = [];
    this.renglon = null;
    this.tipoServicios = null;
    this.titulo.titulo = null;
    (<HTMLInputElement>document.getElementById("titu")).value = null;
    this.profesion = null;
    this.actividades = [];
  }

  cambiaTipoServicios(tipoServicios){

    if(tipoServicios=='T'){
      this.numeroColegiado=null;    
      this.colegio=null;
    }
  }

  cargaDatos(data){
    console.log(data);
    this.direccion = data.direccion;
    this.dpi = data.dpi;
    this.edad = data.edad;
    this.estadoCivil = data.estadoCivilLetras;
    this.idPerfil = data.idPerfil;
    this.nacionalidad = data.nacionalidad;
    this.nombreCompleto = data.nombreCompleto;
    this.nit = data.nit;
    this.renglon = data.renglon;
    this.tipoServicios = data.tipoServicios;
    
    this.ubicacion.idUbicacionFuncional = data.ubicacionFuncional;
    
    if(data.nombreUbicacion != undefined){
      (<HTMLInputElement>document.getElementById("ubica")).value = data.nombreUbicacion;
    }

    if(this.ubicacion.idUbicacionFuncional !=undefined)
      this.getPerfiles();

    if (this.tipoServicios == 'T') {
      this.numeroColegiado = null;
      this.colegio =null;
    }

    if(data.academico !=undefined){      
      this.colegio = data.academico.colegioProfesional;
      this.titulo.titulo = data.academico.titulo;
      (<HTMLInputElement>document.getElementById("titu")).value =data.academico.nombreTitulo;
      this.numeroColegiado = data.academico.numeroColegiado;
      this.profesion = data.academico.profesion;
    }else
    {
      this.titulo=null;
    }
  }

  cargaDatosDelFuncionario(data){

    if (data.code!=200 )
      this.muestraMensaje('error',data.message);    
    else{
      this.data = data.data;
      this.cargaDatos(this.data);
    }

  }

  cargaDatosEdicion(data){
    this.fechaDel = this.utilService.getDateObject(data.fechaDel);
    this.fechaAl = this.utilService.getDateObject(data.fechaAl);
    this.fechaContrato = this.utilService.getDateObject(data.fechaCambioTipoMovimiento);
  }

  descargarDocumento(){
    this.contratoService.descargarDocumento(this.idContrato);
  }

  getActividades(perfil){
    this.rueService
    .getActividadesPorPerfil(perfil,this.data.idRue)
    .subscribe(  actividades => {this.actividades = actividades;},
      error => { var errorMessage = <any>error; console.log(errorMessage);});
  }

  getContrato(){
    this.contratoService
    .getContrato(this.idContrato)
    .subscribe( data => { this.data = data.data;                                                              
      this.actividades = this.data.actividades;
      this.cargaDatosEdicion(this.data);
      this.cargaDatos(this.data);

    },
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

  onChangeColegio(){
    this.academico=null;    
  }

  onChangeNumeroColegiado(){
    this.academico=null;
  }

  onChangeTitulo(){
    this.academico=null;
  }

  openEditaPersonaModal(data){    
      this.showModalEdicion(data);
  }

  showModalEdicion(data){
    let options: NgbModalOptions = {  size: 'lg' };

    const modalRef = this.modalService.open(EditaPersonaComponent,options);
    modalRef.componentInstance.idRue = data.idRue;
    modalRef.result.then((result) =>{

    }, (reason) => {
                    console.log('reason',reason);
                    console.log(this.data.dpi);
                    
                    if(this.contratista == null)
                      this.inicializaContrato();
                    else
                      this.seleccionaContratista();  

    });
  }

  openEditaTituloModal(data){    
      this.showModalEdicionTitulo(data);
  }

  showModalEdicionTitulo(data){
    let options: NgbModalOptions = {  size: 'lg' };
    const modalRef = this.modalService.open(EditaTituloComponent,options);
    modalRef.componentInstance.data = data.academico;
    modalRef.result.then((result) =>{

    }, (reason) => {
                    this.profesion = reason.profesion;
                    /*if(this.contratista == null)
                      this.inicializaContrato();
                    else
                      this.seleccionaContratista();  /*/

    });
  }

  search(event) {
    this.rueService
    .getPersonas(event.query)
    .subscribe(	result =>{ 
      this.personas = result;
    }, 
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
    .subscribe(  data => { 
      //data.data.idContrato = undefined;
      this.idContrato = undefined;
      this.inicializaLaboral(data);

    },
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
