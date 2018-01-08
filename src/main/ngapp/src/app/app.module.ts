import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { AppRoutingModule }         from './app-routing.module';
import { AppConfigModule } from './app-config.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule, DataListModule, DialogModule, InputMaskModule, DropdownModule,GrowlModule,TooltipModule, DataTableModule, SharedModule ,ListboxModule} from 'primeng/primeng';
import { CreaContratoComponent } from './crea-contrato/crea-contrato.component';
import { AddendumComponent } from './addendum/addendum.component'; 
import { ContratoService }         from './services/contrato.service';
import { RueService }         from './services/rue.service';
import { UtilService }         from './services/util.service';
import { BusquedaContratoComponent } from './busqueda-contrato/busqueda-contrato.component';
import { DetalleContratoComponent } from './detalle-contrato/detalle-contrato.component';
import { HistorialEstadosComponent } from './historial-estados/historial-estados.component';
import { DetalleMotivoComponent } from './detalle-motivo/detalle-motivo.component';
import { SpinnerComponentModule } from 'ng2-component-spinner';
import { EditaPersonaComponent } from './edita-persona/edita-persona.component';
@NgModule({
  declarations: [
    AppComponent,    
    CreaContratoComponent,
    AddendumComponent,
    BusquedaContratoComponent,
    DetalleContratoComponent,
    HistorialEstadosComponent,
    DetalleMotivoComponent,
    EditaPersonaComponent
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
    DialogModule,
    SharedModule,
    NgbModule.forRoot(),
    ListboxModule,
    DropdownModule,
    SpinnerComponentModule

  ],
  entryComponents:[AddendumComponent, DetalleMotivoComponent,DetalleContratoComponent,HistorialEstadosComponent,EditaPersonaComponent],
  providers: [ContratoService,RueService,UtilService],
  bootstrap: [AppComponent]  
})
export class AppModule { }
