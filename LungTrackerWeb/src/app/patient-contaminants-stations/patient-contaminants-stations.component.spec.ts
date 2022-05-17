import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientContaminantsStationsComponent } from './patient-contaminants-stations.component';

describe('PatientContaminantsStationsComponent', () => {
  let component: PatientContaminantsStationsComponent;
  let fixture: ComponentFixture<PatientContaminantsStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientContaminantsStationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientContaminantsStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
