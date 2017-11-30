import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEstadosComponent } from './historial-estados.component';

describe('HistorialEstadosComponent', () => {
  let component: HistorialEstadosComponent;
  let fixture: ComponentFixture<HistorialEstadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialEstadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
