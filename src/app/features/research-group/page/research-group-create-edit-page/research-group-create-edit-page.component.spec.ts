import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchGroupCreateEditPageComponent } from './research-group-create-edit-page.component';

describe('ResearchGroupCreateEditPageComponent', () => {
  let component: ResearchGroupCreateEditPageComponent;
  let fixture: ComponentFixture<ResearchGroupCreateEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchGroupCreateEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchGroupCreateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
