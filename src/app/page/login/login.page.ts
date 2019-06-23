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
   // this.state();

  }

  

  login() {
    this.auth.login(this.email, this.password);
    
  }

  



}
