import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { userInfo } from 'os';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
/*
  signupForm = {
    email: "",
    password: "",
    confirmPassword: "",
    userName: ""

  }
*/

email = "";
password = "";
userName = "";


  constructor(private auth: AuthService,
              private af: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) { }

  ngOnInit() {
  }
/*
  signup() {
    console.log(this.email, this.password);
    this.auth.signup(this.email, this.password);
    this.afs.collection("users").add({displayName:this.userName, email:this.email, password:this.password, time:Date.now()/1000 });
  }

*/
  signup(email, password) {
    console.log(email,password);
    this.af.auth.createUserWithEmailAndPassword(email, password).then(
      (success) => {
        this.afs.collection("users").doc(success.user.uid).set({displayName:this.userName, email:this.email, password: this.password, time:Date.now()/1000})
        console.log(success);
        this.router.navigateByUrl('/login');
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  

}
