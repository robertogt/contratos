import { Injectable, Inject } from '@angular/core';
import { Http,Response, Headers,RequestOptions,URLSearchParams } from '@angular/http';
import  'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class RueService {

	public urlActividades:string;
  public urlBuscaEmpleados:string;
	public urlColegios:string;
  public urlEditaRue:string;
  public urlFuncionario:string;
  public urlGetDepartamentos:string;
  public urlGetMunicipios:string;
  public urlPerfiles:string;
  public urlRenglones:string;
  public urlTitulos:string;
  public urlTitulosEdit:string;
  public urlUbicacionesFuncionales:string;
  
  public urlCreaContrato:string;
  public urlGetContrato:string;
  public urlGetEmpleado:string;
  public urlCrearAddendum:string;

	constructor(private http:Http, @Inject(APP_CONFIG) private config: AppConfig) { 
  		this.urlActividades   = config.ENDPOINT+'/bknRRHHContratos/rest/actividades';
      this.urlBuscaEmpleados = config.ENDPOINT+'/bknRRHHContratos/rest/funcionarios';
  		this.urlColegios   = config.ENDPOINT+'/bknRRHHContratos/rest/colegios';
      this.urlCreaContrato   = config.ENDPOINT+'/bknRRHHContratos/rest/contrato';
      this.urlFuncionario  = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/funcionario';
      this.urlEditaRue      = config.ENDPOINT+'/bknRRHHContratos/rest/rue';
      this.urlGetContrato   = config.ENDPOINT+'/bknRRHHContratos/rest/addendum';
      this.urlGetDepartamentos = config.ENDPOINT+'/bknRRHHContratos/rest/rue/departamentos';
      this.urlGetEmpleado =  config.ENDPOINT+'/bknRRHHContratos/rest/rue';
      this.urlGetMunicipios = config.ENDPOINT+'/bknRRHHContratos/rest/rue/municipios';
      this.urlPerfiles   = config.ENDPOINT+'/bknRRHHContratos/rest/actividades/perfiles/ubicacion';
      this.urlRenglones 	= config.ENDPOINT+'/bknRRHHGeneral/restresources/general/renglon';
  		this.urlUbicacionesFuncionales 	= config.ENDPOINT+'/bknRRHHActividades/rest/ubicacionfuncional';
  		this.urlTitulos 	= config.ENDPOINT+'/bknRRHHContratos/rest/titulos';
      this.urlTitulosEdit  = config.ENDPOINT+'/bknRRHHContratos/rest/titulos';
      this.urlCrearAddendum = config.ENDPOINT+'/bknRRHHContratos/rest/addendum';
	}

  editarRue(data:any){      
      let headers = new Headers();
      return this.http.post(this.urlEditaRue,data,{headers:headers})
                      .map(res => res.json());
  }

  editarProfesionTitulo(data:any){
      let params = new URLSearchParams();
      params.set('titulo', data.titulo);      
      params.set('profesion', encodeURI(data.profesion));      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.urlTitulosEdit,params,{headers:headers})
                      .map(res => res.json());
  }

  getEmpleado(rue:string){
      let params = new URLSearchParams();
      params.set('rue', rue); 
      return this.http.get(this.urlGetEmpleado, {search: params})
          .map(res => res.json());
  }

  getDepartamentos(){
      let params = new URLSearchParams();
      return this.http.get(this.urlGetDepartamentos, {search: params})
          .map(res => res.json());
  }

  getMunicipios(departamento:string){
      let params = new URLSearchParams();
      params.set('departamento', departamento); 
      return this.http.get(this.urlGetMunicipios, {search: params})
          .map(res => res.json());
  }

	getPersonas(texto:string){
  		let params = new URLSearchParams();
    	params.set('dpi', texto); 
    	return this.http.get(this.urlBuscaEmpleados, {search: params})
          .map(res => res.json());
	}

	getRenglones(){
		return this.http.get(this.urlRenglones)
          .map(res => res.json());
	}

	getUbicacionesFuncionales(texto:string){
  		let params = new URLSearchParams();
    	params.set('texto', texto); 
    	return this.http.get(this.urlUbicacionesFuncionales, {search: params})
          .map(res => res.json());
	}

	getColegios(){
		return this.http.get(this.urlColegios)
          .map(res => res.json());	
	}

	getTitulos(texto:string){
  		let params = new URLSearchParams();
    	params.set('texto', texto); 
    	return this.http.get(this.urlTitulos, {search: params})
          .map(res => res.json());
	}

	getPerfilesPorUbicacion(idUbicacion:number){
  		let params = new URLSearchParams();
    	params.set('idUbicacion', ""+idUbicacion); 
    	return this.http.get(this.urlPerfiles, {search: params})
          .map(res => res.json());
	}

	getActividadesPorPerfil(perfil:number, rue:number){
  		let params = new URLSearchParams();
    	params.set('perfil', ""+perfil);

      if(rue != undefined)
    	  params.set('rue', ""+rue);

    	return this.http.get(this.urlActividades, {search: params})
          .map(res => res.json());
	}

  getFuncionario(dpi:string){
      let params = new URLSearchParams();
      params.set('dpi', dpi); 
      return this.http.get(this.urlFuncionario, {search: params})
          .map(res => res.json());
  }

  setContrato(data:any){      
      let headers = new Headers();
      return this.http.post(this.urlCreaContrato,data,{headers:headers})
                      .map(res => res.json());
  }

  getContrato(idContrato:number){
      let params = new URLSearchParams();
      params.set('idContrato', ""+idContrato); 
      return this.http.get(this.urlGetContrato, {search: params})
          .map(res => res.json());
  }

  crearAddendum(data:any){      
      let headers = new Headers();
      return this.http.post(this.urlCrearAddendum,data,{headers:headers})
                      .map(res => res.json());
  }


}
