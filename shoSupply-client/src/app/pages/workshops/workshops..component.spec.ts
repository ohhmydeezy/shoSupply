import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsComponent } from './workshops.component';

describe('Workshops', () => {
  let component: WorkshopsComponent;
  let fixture: ComponentFixture<WorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkshopsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
