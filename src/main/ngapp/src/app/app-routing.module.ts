import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaContratoComponent } from './crea-contrato/crea-contrato.component';
import { AddendumComponent } from './addendum/addendum.component'; 
 
const routes: Routes = [
  { path: '', redirectTo: '/contrato', pathMatch: 'full' },
  { path: 'contrato',  component: CreaContratoComponent },
  { path: 'addendum',  component: AddendumComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
