import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireModule, FirebaseAuth } from "@angular/fire";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private af: AngularFireAuth,
    private router: Router
  ) {
  }

  signup(email, password) {
    this.af.auth.createUserWithEmailAndPassword(email, password).then(
      (success)=> {
        console.log(success);
        this.router.navigateByUrl('/login');
      } 
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  login(email, password) {
    this.af.auth.signInWithEmailAndPassword(email,password).then(
      () => {
        console.log("welcome");
        this.router.navigateByUrl('/welcome');
      }
    ).catch(
      (error) => {
        console.log("Login Error:", error);
      }
    );
  }



  /*firebase.auth().signInWithEmailAndPassword(email, password)
     *     .catch(function(error) {
     *   // Handle Errors here.
     *   var errorCode = error.code;
     *   var errorMessage = error.message;
     *   if (errorCode === 'auth/wrong-password') {
     *     alert('Wrong password.');
     *   } else {
     *     alert(errorMessage);
     *   }
     *   console.log(error);
     * });
     *
  */
}
