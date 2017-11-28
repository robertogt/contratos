import { Injectable, Inject } from '@angular/core';
import { Http,Response, Headers,RequestOptions,URLSearchParams } from '@angular/http';
import  'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class ContratoService {

  public urlActividades:string;  
  public urlContrato:string;
  public urlContratosPendientesActivos:string;
  public urlDescargarDocumento:string;
  public urlRegistrarNumeroFianza:string;  
  public urlUpdateContrato:string;

  	constructor(private http:Http, @Inject(APP_CONFIG) private config: AppConfig) { 

      this.urlActividades = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta/actividades';
      this.urlContrato = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta/edit';
      this.urlContratosPendientesActivos = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta';
      this.urlDescargarDocumento = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/generar/';
      this.urlRegistrarNumeroFianza = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/fianza';
      this.urlUpdateContrato = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/editar';
      
  	}

    descargarDocumento(idContrato:number){      
      window.open(this.urlDescargarDocumento+idContrato);
    }
    
    getActividadesContrato(idContrato: number){
      let params = new URLSearchParams();
      params.set('contrato', ""+idContrato); 
      return this.http.get(this.urlActividades, {search: params})
          .map(res => res.json());
    }

    getContrato(contrato:number){
      let params = new URLSearchParams();
      params.set('contrato', ""+contrato); 
      return this.http.get(this.urlContrato,{search:params})
          .map(res => res.json());
    }

    getContratos(anio){
      let params = new URLSearchParams();
      params.set('anio', ""+anio); 
      return this.http.get(this.urlContratosPendientesActivos,{search:params})
          .map(res => res.json());
    }

    registrarNumeroFianza(idContrato:number, numeroFianza:string){      
      let params = new URLSearchParams();
      params.set('contrato', ""+idContrato);
      params.set('fianza', numeroFianza);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.urlRegistrarNumeroFianza,params,{headers:headers})
                      .map(res => res.json());
    }

    updateContrato(data:any){ 
      let headers = new Headers();
      return this.http.post(this.urlUpdateContrato,data,{headers:headers})
                      .map(res => res.json());
    }
  	
}
