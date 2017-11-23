import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaContratoComponent } from './busqueda-contrato.component';

describe('BusquedaContratoComponent', () => {
  let component: BusquedaContratoComponent;
  let fixture: ComponentFixture<BusquedaContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
