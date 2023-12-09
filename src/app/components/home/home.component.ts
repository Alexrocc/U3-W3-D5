import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: any;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.restore();
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user).user.name;
    } else {
      return;
    }
  }
}
