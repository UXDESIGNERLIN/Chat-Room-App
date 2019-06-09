import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private auth:AuthService) {
  }
 
  

  ngOnInit() {
  }

  login() {
    console.log(this.email, this.password);
    this.auth.login(this.email, this.password);
  }
}
