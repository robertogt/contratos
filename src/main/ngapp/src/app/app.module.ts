import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule} from '@angular/http';
import { AppRoutingModule }         from './app-routing.module';
import { AppConfigModule } from './app-config.module';
import { AutoCompleteModule, DataListModule } from 'primeng/primeng';
import { CreaContratoComponent } from './crea-contrato/crea-contrato.component';
import { AddendumComponent } from './addendum/addendum.component'; 
import { RueService }         from './services/rue.service';

@NgModule({
  declarations: [
    AppComponent,    
    CreaContratoComponent,
    AddendumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AppConfigModule,
    AutoCompleteModule,
    DataListModule,
    NgbModule.forRoot()
  ],
  providers: [RueService],
  bootstrap: [AppComponent]  
})
export class AppModule { }
