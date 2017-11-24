import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { AppRoutingModule }         from './app-routing.module';
import { AppConfigModule } from './app-config.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule, DataListModule, InputMaskModule, GrowlModule,TooltipModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { CreaContratoComponent } from './crea-contrato/crea-contrato.component';
import { AddendumComponent } from './addendum/addendum.component'; 
import { RueService }         from './services/rue.service';
import { UtilService }         from './services/util.service';
import { BusquedaContratoComponent } from './busqueda-contrato/busqueda-contrato.component';
import { DetalleContratoComponent } from './detalle-contrato/detalle-contrato.component';


@NgModule({
  declarations: [
    AppComponent,    
    CreaContratoComponent,
    AddendumComponent,
    BusquedaContratoComponent,
    DetalleContratoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AppConfigModule,
    AutoCompleteModule,
    InputMaskModule,
    DataListModule,
    GrowlModule,
    TooltipModule,
    DataTableModule,
    SharedModule,
    NgbModule.forRoot()

  ],
  entryComponents:[AddendumComponent, DetalleContratoComponent],
  providers: [RueService,UtilService],
  bootstrap: [AppComponent]  
})
export class AppModule { }
