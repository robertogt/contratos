import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaContratoComponent } from './crea-contrato.component';

describe('CreaContratoComponent', () => {
  let component: CreaContratoComponent;
  let fixture: ComponentFixture<CreaContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
