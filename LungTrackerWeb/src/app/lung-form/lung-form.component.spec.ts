import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LungFormComponent } from './lung-form.component';

describe('LungFormComponent', () => {
  let component: LungFormComponent;
  let fixture: ComponentFixture<LungFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LungFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LungFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
