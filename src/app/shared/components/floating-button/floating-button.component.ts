import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'floating-button',
    imports: [CommonModule, RouterModule],
    templateUrl: './floating-button.component.html',
    styleUrl: './floating-button.component.css'
})
export class FloatingButtonComponent {
  @Input() route: string | string[] = 'create';
  @Input() customElement: string = "+";
  @Input() icon: string = 'add';
}
