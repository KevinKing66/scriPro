import { Component } from '@angular/core';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [UserDropdownComponent, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

}
