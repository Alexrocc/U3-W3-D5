import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: NgForm;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(form: NgForm) {
    try {
      this.authSrv.register(form.value).subscribe();
      this.router.navigate(['login']);
      alert('Registration successful');
    } catch (error) {
      this.router.navigate(['register']);
      alert('Registration failed!');
    }
  }
}
