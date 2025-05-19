import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchGroupListComponent } from './research-group-list.component';

describe('ResearchGroupListComponent', () => {
  let component: ResearchGroupListComponent;
  let fixture: ComponentFixture<ResearchGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchGroupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
