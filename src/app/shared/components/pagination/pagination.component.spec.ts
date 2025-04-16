import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.maxPages = 5;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 page numbers when there are 5 pages', () => {
    const pageNumbers = fixture.debugElement.queryAll(By.css('.number-page'));
    expect(pageNumbers.length).toBe(3);
  });

  it('should display pages 1, 2, and 3 when on the first page (0)', () => {
    component.page.set(0);
    fixture.detectChanges();

    const pageNumbers = fixture.debugElement.queryAll(By.css('.number-page'));
    const pageText = pageNumbers.map((el) => el.nativeElement.textContent.trim());
    expect(pageText).toEqual(['1', '2', '3']);
  });

  it('should display pages 2, 3, and 4 when on the second page (1)', () => {
    component.page.set(1);
    fixture.detectChanges();

    const pageNumbers = fixture.debugElement.queryAll(By.css('.number-page'));
    const pageText = pageNumbers.map((el) => el.nativeElement.textContent.trim());
    expect(pageText).toEqual(['1', '2', '3']);
  });

  it('should display pages 3, 4, and 5 when on the third page (2)', () => {
    component.page.set(2);
    fixture.detectChanges();

    const pageNumbers = fixture.debugElement.queryAll(By.css('.number-page'));
    const pageText = pageNumbers.map((el) => el.nativeElement.textContent.trim());
    expect(pageText).toEqual(['2', '3', '4']);
  });

  it('should display pages 4, 5, and 6 when on the fourth page (3)', () => {
    component.page.set(3);
    fixture.detectChanges();

    const pageNumbers = fixture.debugElement.queryAll(By.css('.number-page'));
    const pageText = pageNumbers.map((el) => el.nativeElement.textContent.trim());
    expect(pageText).toEqual(['3', '4', '5']);
  });

  it('should display pages 4, 5, and 6 when on the last page (4)', () => {
    component.page.set(4);
    fixture.detectChanges();

    const pageNumbers = fixture.debugElement.queryAll(By.css('.number-page'));
    const pageText = pageNumbers.map((el) => el.nativeElement.textContent.trim());
    expect(pageText).toEqual(['3', '4', '5']);
  });

  it('should change page on number click', () => {
    const secondPage = fixture.debugElement.queryAll(By.css('.number-page'))[1];
    secondPage.nativeElement.click();
    fixture.detectChanges();

    const active = fixture.debugElement.query(By.css('.number-page.active'));
    expect(active.nativeElement.textContent.trim()).toBe('2');
    expect(component.page()).toBe(1);
  });

  it('should go to next page on right arrow click', () => {
    const nextArrow = fixture.debugElement.queryAll(By.css('.pagination-options'))[1];
    nextArrow.nativeElement.click();
    fixture.detectChanges();

    expect(component.page()).toBe(1);
  });

  it('should not go beyond maxPages', () => {
    component.page.set(4); // last page (index 4)
    fixture.detectChanges();

    const nextArrow = fixture.debugElement.queryAll(By.css('.pagination-options'))[1];
    nextArrow.nativeElement.click();
    fixture.detectChanges();

    expect(component.page()).toBe(4); // should stay the same
  });

  it('should go to previous page on left arrow click', () => {
    component.page.set(2);
    fixture.detectChanges();

    const prevArrow = fixture.debugElement.queryAll(By.css('.pagination-options'))[0];
    prevArrow.nativeElement.click();
    fixture.detectChanges();

    expect(component.page()).toBe(1);
  });

  it('should not go below page 0', () => {
    component.page.set(0);
    fixture.detectChanges();

    const prevArrow = fixture.debugElement.queryAll(By.css('.pagination-options'))[0];
    prevArrow.nativeElement.click();
    fixture.detectChanges();

    expect(component.page()).toBe(0);
  });
});
