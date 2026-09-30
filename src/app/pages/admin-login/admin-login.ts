import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})

export class AdminLogin {
  email = '';
  senha = '';

  constructor(private router: Router) {}

  entrar() {
    if (this.email === 'admin@aepi.com' && this.senha === '123456') {
      localStorage.setItem('adminLogado', 'true')
      this.router.navigate(['/admin']);
    } else {
      console.log('E-mail ou senha incorretos');
    }
  }
}
