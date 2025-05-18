import { Component, EventEmitter, Input, Output, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() maxPages: number = 1;
  @Input() initialPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  page: WritableSignal<number> = signal(this.initialPage);

  getPage = computed(() => {
    const current = this.page();
    const last = this.maxPages - 1;

    if (this.maxPages <= 3) {
      return Array.from({ length: this.maxPages }, (_, i) => i);
    }

    if (current === 0) return [0, 1, 2];
    if (current === last) return [last - 2, last - 1, last];

    return [current - 1, current, current + 1];
  });


  changePage(i: number) {
    this.page.set(i);
    this.pageChange.emit(i);
  }

  previous() {
    if (this.page() > 1) {
      this.page.update((p) => {
        const newPage = p - 1;
        this.pageChange.emit(newPage);
        return newPage;
      });
    }
  }

  next() {
    if (this.page() < this.maxPages) {
      this.page.update((p) => {
        const newPage = p + 1;
        this.pageChange.emit(newPage);
        return newPage;
      });
    }
  }

  nextPageExists() {
    return this.page() < this.maxPages && this.maxPages > 1;
  }

  previousPageExists() {
    return this.page() > 1 && this.maxPages > 1;
  }
}
