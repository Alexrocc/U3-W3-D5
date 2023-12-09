import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  form!: NgForm;

  ngOnInit(): void {}

  logIn(form: NgForm) {
    try {
      this.authSrv.login(form.value).subscribe();
      alert('Login successful!');
      this.router.navigate(['/']);
    } catch (error) {
      alert('Login failed!');
      console.log(error);
      this.router.navigate(['login']);
    }
  }
}
