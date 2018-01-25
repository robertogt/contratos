import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudGastoComponent } from './solicitud-gasto.component';

describe('SolicitudGastoComponent', () => {
  let component: SolicitudGastoComponent;
  let fixture: ComponentFixture<SolicitudGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
