import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPersonaComponent } from './edita-persona.component';

describe('EditaPersonaComponent', () => {
  let component: EditaPersonaComponent;
  let fixture: ComponentFixture<EditaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
