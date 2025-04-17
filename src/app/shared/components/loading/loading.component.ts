import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  private dots = signal('');
  loadingText = signal('Cargando...');

  constructor() {
    let count = 0;
    setInterval(() => {
      count = (count + 1) % 4; // 0,1,2,3 → 0
      this.dots.set('.'.repeat(count));
      this.loadingText.set('Cargando' + this.dots());
    }, 500);
  }
}
