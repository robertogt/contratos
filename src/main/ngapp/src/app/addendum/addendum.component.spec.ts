import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddendumComponent } from './addendum.component';

describe('AddendumComponent', () => {
  let component: AddendumComponent;
  let fixture: ComponentFixture<AddendumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddendumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
