import { Component, OnInit, Input} from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RueService } from '../services/rue.service';
import { Laboral } from '../model/laboral';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-addendum',
  templateUrl: './addendum.component.html',
  styleUrls: ['./addendum.component.css'],
  providers: [NgbActiveModal]
})
export class AddendumComponent implements OnInit {
	
	contratista: any;
	data: any={};
  msgs: Message[] = [];
  fechaMaxima: any;
  fechaMinima: any;
  perfiles: any[];
  personas: any[];
  renglon: any;
	renglones: any[];
	tipoServicios: any;
	tiposServicios: any[];
	ubicacion: any={};
	ubicaciones: any[];  

  @Input() idContrato: any;
  
  constructor(private rueService:RueService, private utilService:UtilService, private activeModal:NgbActiveModal) { }

  ngOnInit() {
      
  		this.tiposServicios = [{value:'T',label:'Tecnicos'},{value:'P',label:'Profesionales'}]
		  this.rueService.getRenglones().subscribe(renglones => this.renglones = renglones);
      this.cargaDatosDelContrato()
  }

  cargaDatos(data){
    console.log(this.data);
    this.getPerfiles(this.data.ubicacionFuncional);
    this.getActividades(this.data.idPerfil);
    this.data.fechaContrato=this.utilService.getDateObject(this.data.fechaCambioTipoMovimiento);
    this.fechaMinima = this.utilService.getDateObject(this.data.fechaDel);
    this.fechaMaxima = this.utilService.getDateObject(this.data.fechaAl);
    (<HTMLInputElement>document.getElementById("ubica")).value = this.data.nombreUbicacion;
    this.ubicacion.idUbicacionFuncional = this.data.ubicacionFuncional;
  }

  cargaDatosDelContrato(){
    this.getContrato(this.idContrato);
  }

  cargaDatosDelFuncionario(data){
    
    if (data.code!=200)
      this.muestraMensaje('error',data.message);    
    else{
      	this.data = data.data;
      	this.cargaDatos(this.data);
    	}

	}

  getContrato(idContrato){
    this.rueService
    .getContrato(idContrato)
    .subscribe(  data => { console.log('data',data);
                          this.data = data.data;
                          this.cargaDatos(this.data)
                          },
                error => { var errorMessage = <any>error; console.log(errorMessage);});
  }

	getActividades(perfil){

      this.rueService
      .getActividadesPorPerfil(perfil,this.data.idRue)
      .subscribe(  actividades => {this.data.actividades = actividades;},
                error => { var errorMessage = <any>error; console.log(errorMessage);});
  }

	getPerfiles(idUbicacionFuncional){

  	this.rueService
  	.getPerfilesPorUbicacion(idUbicacionFuncional)
  	.subscribe(	perfiles => { 
                              this.perfiles = perfiles;                              
                            },
           		  error => { var errorMessage = <any>error; console.log(errorMessage);}
             );
  }

  muestraMensaje(tipoMensaje, message){
    this.msgs.push({severity:tipoMensaje, summary:'', detail:message});
  }

  onSubmit(f: NgForm){

    if(!this.validaDatos())
      return;
    console.log(this.ubicacion);
    this.data.ubicacionFuncional = this.ubicacion.idUbicacionFuncional;    
    this.data.fechaCambioTipoMovimiento = this.data.fechaContrato.day+'/'+this.data.fechaContrato.month+'/'+this.data.fechaContrato.year;
    
    console.log('data',this.data);

    this.activeModal.dismiss();
    this.rueService.crearAddendum(this.data).subscribe( 
                                                      response => {console.log(response),
                                                                   //this.limpiarForm(f);
                                                                   this.muestraMensaje('success','addendum creado');
                                                                   console.log(response);
                                                                 },
                                                      error => {this.muestraMensaje('error',error);
                                                                }
                                                     );
  }

	searchUbicacion(event) {
    this.rueService
    .getUbicacionesFuncionales(event.query)
    .subscribe(	ubicaciones => {this.ubicaciones = ubicaciones;},
            		error => { var errorMessage = <any>error; console.log(errorMessage);});
  }

  selectPerfil(perfil){
    this.data.idPerfil = perfil.idPerfil;
  	this.getActividades(this.data.idPerfil);
  }
  	
  seleccionaUbicacion(){
    this.data.actividades = [];
  	this.getPerfiles(this.ubicacion.idUbicacionFuncional);
  }

  validaDatos(){

    if(this.data.idPerfil == null){
      this.muestraMensaje('error','Seleccione un perfil');
      return false;
    }

    let actividadSeleccionada:boolean=false;
    for (var i = this.data.actividades.length - 1; i >= 0; i--) {      
      if(this.data.actividades[i].seleccionado)
        actividadSeleccionada = this.data.actividades[i].seleccionado;
    }
    if(!actividadSeleccionada){
      this.muestraMensaje('error','Seleccione al menos una actividad');
      return false;
    }
    return true;
  }

  test(){
    alert('hola mundo');
  }

}
