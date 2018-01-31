import { Injectable, Inject } from '@angular/core';
import { Http,Response, Headers,RequestOptions,URLSearchParams } from '@angular/http';
import  'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class ContratoService {

  public urlActividades:string;
  public urlAnularContrato:string;
  public urlContrato:string;
  public urlContratosPendientesActivos:string;  
  public urlDescargarDocumento:string;
  public urlDescargarDocumentoFisico:string;
  public urlEstadosHistorial:string;
  public urlRegistrarNumeroFianza:string;
  public urlRegistraSolicitud:string;
  public urlRescindirContrato:string;
  public urlUpdateContrato:string;
  public urlMotivosRechazo:string;
  public urlEstados:string;
  

  	constructor(private http:Http, @Inject(APP_CONFIG) private config: AppConfig) { 

      this.urlActividades = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta/actividades';
      this.urlAnularContrato = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/anular';
      this.urlContrato = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta/edit';
      this.urlContratosPendientesActivos = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta';
      this.urlDescargarDocumento = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/generar/';
      this.urlDescargarDocumentoFisico = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/generar/rechazado/';
      this.urlEstadosHistorial = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta/cambios';
      this.urlRegistrarNumeroFianza = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/fianza';
      this.urlRescindirContrato = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/resindir';
      this.urlUpdateContrato = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/editar';
      this.urlMotivosRechazo = config.ENDPOINT+'/bknRRHHContratos/rest/asesor/historial/motivos';
      this.urlEstados = config.ENDPOINT+'/bknRRHHContratos/rest/contrato/consulta/estados';
      this.urlRegistraSolicitud = config.ENDPOINT+'/bknRRHHContratos/rest/solicitud';
       //idContrato, fechaSolicitud
  	}

    anularContrato(idContrato:number, observacion:string, estado:string){
      console.log('anulando',idContrato, observacion, estado);
      let params = new URLSearchParams();
      params.set('contrato', ""+idContrato);
      params.set('observacion', observacion);
      params.set('estado', estado);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.urlAnularContrato,params,{headers:headers})
                      .map(res => res.json());
    }

    descargarDocumento(idContrato:number){      
      window.open(this.urlDescargarDocumento+idContrato);
    }

    descargarDocumentoRechazado(idContrato:number){      
      window.open(this.urlDescargarDocumentoFisico+idContrato);
    }

    
    getActividadesContrato(idContrato: number){
      let params = new URLSearchParams();
      params.set('contrato', ""+idContrato); 
      return this.http.get(this.urlActividades, {search: params})
          .map(res => res.json());
    }

    getMotivosRechazo(idEstadoContrato: string){
      let params = new URLSearchParams();
      params.set('contratoEstado',idEstadoContrato); 
      return this.http.get(this.urlMotivosRechazo, {search: params})
          .map(res => res.json());
    }

    getContrato(contrato:number){
      let params = new URLSearchParams();
      params.set('contrato', ""+contrato); 
      return this.http.get(this.urlContrato,{search:params})
          .map(res => res.json());
    }

    getEstados(){
      let params = new URLSearchParams();
      return this.http.get(this.urlEstados,{search:params})
          .map(res => res.json());
    }

    getContratos(anio,renglon,estado){
      let params = new URLSearchParams();
      params.set('anio', ""+anio);
      if(renglon != 'null'){params.set('renglon', renglon);}
      if(estado != 'null'){params.set('estado',estado);}
      return this.http.get(this.urlContratosPendientesActivos,{search:params})
          .map(res => res.json());
    }

    getEstadosHistorial(contrato:number){
      let params = new URLSearchParams();
      params.set('contrato', ""+contrato); 
      return this.http.get(this.urlEstadosHistorial,{search:params})
          .map(res => res.json());
    }

    registrarNumeroFianza(idContrato:number, numeroFianza:string, fechaFianza:string){      
      let params = new URLSearchParams();
      params.set('contrato', ""+idContrato);
      params.set('fianza', numeroFianza);
      params.set('fechaFianza', fechaFianza);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.urlRegistrarNumeroFianza,params,{headers:headers})
                      .map(res => res.json());
    }

    registrarSolicitudDeGasto(idContrato:number, fechaSolicitud:string){      
      let params = new URLSearchParams();
      params.set('idContrato', ""+idContrato);
      params.set('fechaSolicitud', fechaSolicitud);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.urlRegistraSolicitud,params,{headers:headers})
                      .map(res => res.json());
    }

    rescindirContrato(idContrato:number, fechaFin:string, observacion:string){
      let params = new URLSearchParams();
      params.set('contrato', ""+idContrato);
      params.set('fechaFin',fechaFin)
      params.set('observacion',observacion)
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(this.urlRescindirContrato,params,{headers:headers})
                      .map(res => res.json());
    }

    updateContrato(data:any){ 
      let headers = new Headers();
      return this.http.post(this.urlUpdateContrato,data,{headers:headers})
                      .map(res => res.json());
    }
  	
}
