import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  	objetoFecha:any;
  	constructor() { }

  	//fecha dd/mm/yyyy
  	getDateObject(fecha:string){
  		let partes = fecha.split('/');
  		return {'day':parseInt(partes[0]), 'month':parseInt(partes[1]),'year':parseInt(partes[2])}
  	}

  	getAnios = function(anioInferior, anioSuperior){
        let anios=[];
        
        for(var i= anioInferior; i<=anioSuperior; i++){
            let anio = { "value": i, "text":i};
            anios.push(anio);
        }
        return anios;
    }

}
