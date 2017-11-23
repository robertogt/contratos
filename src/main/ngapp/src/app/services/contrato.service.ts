import { Injectable, Inject } from '@angular/core';
import { Http,Response, Headers,RequestOptions,URLSearchParams } from '@angular/http';
import  'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class ContratoService {

	public urlContratosPendientes:string;

  	constructor(private http:Http, @Inject(APP_CONFIG) private config: AppConfig) { 

  		this.urlContratosPendientes   = config.ENDPOINT+'/RRHHContratos/rest/addendum/contrato';
  	}

  	getContratosPendientes(){
  	/*	let params = new URLSearchParams();
    	params.set('idUbicacion', ""+idUbicacion); 
    	return this.http.get(this.urlPerfiles, {search: params})
          .map(res => res.json());*/
	}

}
