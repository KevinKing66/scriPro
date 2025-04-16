import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserFormComponent } from './login-user-form.component';

describe('LoginUserFormComponent', () => {
  let component: LoginUserFormComponent;
  let fixture: ComponentFixture<LoginUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUserFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
