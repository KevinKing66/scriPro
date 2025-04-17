import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  private text = 'Cargando...';
  private index = signal(0);
  loadingText = signal('');

  constructor() {
    setInterval(() => {
      const currentIndex = this.index() + 1;
      this.index.set(currentIndex % (this.text.length + 1)); // Reinicia al final del texto
      this.loadingText.set(this.text.substring(0, this.index()));
    }, 150);
  }
}
