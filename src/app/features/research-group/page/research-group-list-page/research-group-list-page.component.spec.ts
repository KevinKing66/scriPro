import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchGroupListPageComponent } from './research-group-list-page.component';

describe('ResearchGroupListPageComponent', () => {
  let component: ResearchGroupListPageComponent;
  let fixture: ComponentFixture<ResearchGroupListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchGroupListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchGroupListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
