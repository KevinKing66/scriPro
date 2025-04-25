import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordPage } from './change-password.page';

describe('ChangePasswordPageComponent', () => {
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
