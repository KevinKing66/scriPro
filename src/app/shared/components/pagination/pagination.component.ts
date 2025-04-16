import { Component, computed, Input, Signal, signal, WritableSignal } from '@angular/core';

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

  page: WritableSignal<number> = signal(0);

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
  }

  previous() {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
    }
  }

  next() {
    if (this.page() < this.maxPages - 1) {
      this.page.update((p) => p + 1);
    }
  }
}
