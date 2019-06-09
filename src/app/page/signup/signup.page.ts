import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signup() {
    console.log(this.email, this.password);
    this.auth.signup(this.email, this.password);
  }

  

}
