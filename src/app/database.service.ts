import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseAuth } from "@angular/fire";
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreCollectionGroup, AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private storage;
  private storageRef;
  private collect;
  private itemDoc: AngularFirestoreDocument<User>;
  private userCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  constructor(
    private db: AngularFirestore, 
    //private collection: AngularFirestoreCollection 
  ) {

    
    //this.storage = this.db.storage;
    //this.storageRef = this.db.storage.ref();
    //this.collect = this.collection; 
  }

  addUser() {
    this.userCollection = this.db.collection<User>('users');
    console.log(this.userCollection);
  }

  

}
/*
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
*/