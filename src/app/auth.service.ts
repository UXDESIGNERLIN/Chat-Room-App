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
  user$: Observable<any>;
  constructor(
    private af: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,

  ) {
    //Get auth data, then get firestore user document || null 
    this.user$ = this.af.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  

  //Get the currently signed-in user 
/*
  getCurrentUser() {
    let profileUid;
    let user = this.af.auth.currentUser;
    if (user) {
      user.providerData.forEach(function (profile) {
        profileUid = profile.uid;
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
    else {
      console.log("no one");
    }
    return profileUid;
  }
*/

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      this.af.auth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

/*
getCurrentUser():Observable<any>{
  return <any>this.af.auth.onAuthStateChanged((user) => {
    if (user) {
    return of (user)
    } else {
      console.log("No one here");
    }
  })
}


  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = this.af.auth.currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
*/
  signup(email, password) {
    this.af.auth.createUserWithEmailAndPassword(email, password).then(
      (success) => {
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
