import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	contratoActivo:boolean=true;
	consultaActivo:boolean=false;
  	title = 'app';

  	setContratoActivo(elemento){
  		this.contratoActivo = true;
  		this.consultaActivo = false;
  	}

  	setConsultaActivo(elemento){
  		this.consultaActivo = true;
  		this.contratoActivo = false;  		
  	}

}
