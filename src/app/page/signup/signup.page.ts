import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  userName: string;

  constructor(private auth: AuthService,
              private afs: AngularFirestore) { }

  ngOnInit() {
  }

  signup() {
    console.log(this.email, this.password);
    this.auth.signup(this.email, this.password);
    this.afs.collection("users").add({ });
  }

  

}
