import { Component } from '@angular/core';

@Component({
  selector: 'app-login-user-form',
  standalone: true,
  imports: [],
  templateUrl: './login-user-form.component.html',
  styleUrl: './login-user-form.component.css'
})
export class LoginUserFormComponent {
  email: string = '';
  password: string = '';

  onLogin() {
    // Aquí va la lógica de autenticación
    console.log('Login', this.email, this.password);
  }

}
