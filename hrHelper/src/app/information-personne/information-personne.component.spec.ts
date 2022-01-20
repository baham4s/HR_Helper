import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPersonneComponent } from './information-personne.component';

describe('InformationPersonneComponent', () => {
  let component: InformationPersonneComponent;
  let fixture: ComponentFixture<InformationPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
