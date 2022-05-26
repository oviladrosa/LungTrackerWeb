import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletPublicMapComponent } from './leaflet-public-map.component';

describe('LeafletPublicMapComponent', () => {
  let component: LeafletPublicMapComponent;
  let fixture: ComponentFixture<LeafletPublicMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletPublicMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletPublicMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
