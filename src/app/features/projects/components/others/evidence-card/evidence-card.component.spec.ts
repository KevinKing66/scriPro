import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceCardComponent } from './evidence-card.component';

describe('EvidenceCardComponent', () => {
  let component: EvidenceCardComponent;
  let fixture: ComponentFixture<EvidenceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidenceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
