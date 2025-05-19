import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchGroupFormComponent } from './research-group-form.component';

describe('ResearchGroupFormComponent', () => {
  let component: ResearchGroupFormComponent;
  let fixture: ComponentFixture<ResearchGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchGroupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
