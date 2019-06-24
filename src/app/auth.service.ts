import { Injectable } from '@angular/core';
import { auth, User } from 'firebase/app';
import { AngularFireModule, FirebaseAuth } from "@angular/fire";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Session } from 'protractor';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
 
  constructor(
    private af: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,

  ) {
   
  }

 

getCurrentUser():Observable<any>{
  return <any> of (this.af.auth.onAuthStateChanged);
}

/*
  signup(email, password) {
    this.af.auth.createUserWithEmailAndPassword(email, password).then(
      (success) => {
        this.afs.collection("users").doc(success.user.uid).set({})
        console.log(success);
        this.router.navigateByUrl('/login');
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
*/
  login(email, password) {
    this.af.auth.signInWithEmailAndPassword(email, password).then(
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

  logout() {
    this.af.auth.signOut().then((x) => {
      console.log("User log out ", x);
      this.router.navigateByUrl('/login');
    }).catch((error) => {
      console.log("error", error);
    })
  }


  state(email, password) {
    this.af.auth.setPersistence("Session").then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return this.login(email, password);
    })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

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
