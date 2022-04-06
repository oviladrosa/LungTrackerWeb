import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LungFormQuestionsComponent } from './lung-form-questions.component';

describe('LungFormQuestionsComponent', () => {
  let component: LungFormQuestionsComponent;
  let fixture: ComponentFixture<LungFormQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LungFormQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LungFormQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
