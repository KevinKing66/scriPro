import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePage } from './user-profile.page';

describe('UserProfilePageComponent', () => {
  let component: UserProfilePage;
  let fixture: ComponentFixture<UserProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
