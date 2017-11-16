import { Injectable, Inject } from '@angular/core';
import { Http,Response, Headers,RequestOptions,URLSearchParams } from '@angular/http';
import  'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class RueService {

	public urlBuscaEmpleados:string;
	public urlRenglones:string;
	public urlUbicacionesFuncionales:string;
	public urlColegios:string;
	public urlTitulos:string;
	public urlPerfiles:string;
	public urlActividades:string;
  public urlFuncionario:string;
  public urlCreaContrato:string;

	constructor(private http:Http, @Inject(APP_CONFIG) private config: AppConfig) { 
  		this.urlBuscaEmpleados = config.ENDPOINT+'/bknRRHHContratos/rest/funcionarios';
  		this.urlRenglones 	= config.ENDPOINT+'/BackEndPresupuesto/restresources/presupuesto/renglon';
  		this.urlUbicacionesFuncionales 	= config.ENDPOINT+'/bknRRHHActividades/rest/ubicacionfuncional';
  		this.urlTitulos 	= config.ENDPOINT+'/bknRRHHContratos/rest/titulos';
  		this.urlColegios 	= config.ENDPOINT+'/bknRRHHContratos/rest/colegios';
  		this.urlPerfiles 	= config.ENDPOINT+'/bknRRHHContratos/rest/actividades/perfiles/ubicacion';
  		this.urlActividades 	= config.ENDPOINT+'/bknRRHHContratos/rest/actividades';
      this.urlFuncionario  = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/funcionario';
      this.urlCreaContrato   = config.ENDPOINT+'/bknRRHHContratos/rest/contrato';
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


}
