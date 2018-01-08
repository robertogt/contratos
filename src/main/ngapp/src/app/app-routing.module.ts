import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaContratoComponent } from './crea-contrato/crea-contrato.component';
import { AddendumComponent } from './addendum/addendum.component'; 
import { BusquedaContratoComponent } from './busqueda-contrato/busqueda-contrato.component'; 
 
const routes: Routes = [
  { path: '', redirectTo: '/contrato', pathMatch: 'full' }
   ,{ path: 'contrato',  component: CreaContratoComponent }
   ,{ path: 'contrato/:idContrato',  component: CreaContratoComponent }
   ,{ path: 'consulta',  component: BusquedaContratoComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
