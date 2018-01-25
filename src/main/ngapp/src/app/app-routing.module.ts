import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaContratoComponent } from './crea-contrato/crea-contrato.component';
import { AddendumComponent } from './addendum/addendum.component'; 
import { BusquedaContratoComponent } from './busqueda-contrato/busqueda-contrato.component'; 
import { SolicitudGastoComponent } from './solicitud-gasto/solicitud-gasto.component'; 
 
const routes: Routes = [
  { path: '', redirectTo: '/contrato', pathMatch: 'full' }
   ,{ path: 'contrato',  component: CreaContratoComponent }
   ,{ path: 'contrato/:idContrato',  component: CreaContratoComponent }
   ,{ path: 'consulta',  component: BusquedaContratoComponent }
   ,{ path: 'solicitud',  component: SolicitudGastoComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
