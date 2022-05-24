import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherMapComponent } from './researcher-map.component';

describe('ResearcherMapComponent', () => {
  let component: ResearcherMapComponent;
  let fixture: ComponentFixture<ResearcherMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearcherMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
