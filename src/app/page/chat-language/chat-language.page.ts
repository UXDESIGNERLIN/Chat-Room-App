import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { message } from 'src/app/message';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { user } from 'src/app/user';
import { User } from 'firebase';



@Component({
  selector: 'app-chat-language',
  templateUrl: './chat-language.page.html',
  styleUrls: ['./chat-language.page.scss'],
})  
export class ChatLanguagePage implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;

  currentUser_id: string;
  currentUser: string;

  messages: message[] = [
    {
      uid:"",
      user: "",
      text: "",
      time: Date.now()/1000
    }
  ];

  users: user[] = [
    {
      uid:"",
      name: "",
      email: "",
      password: "",
      phtotUrl: ""
    }
  ]

  myMap = new Map();

  messages_db: any = this.afs.collection('chats/rhJKJtUW7QGLIRm4Jps1/messages', ref => ref.orderBy("time","asc").limit(100));

  constructor(private auth: AuthService,
              private af: AngularFireAuth,
              private afs: AngularFirestore,
 
              ) {
             

               }

  ngOnInit() { 
    this.showUsers();
    console.log(this.currentUser_id);
    this.queryMessage();
   // this.getUserbyId();
    
  }

  scrolltoBottom() {
    //Craxy Shadow Dom//
    (this.feedContainer.nativeElement.parentElement.shadowRoot.children[1] as any).scroll(0,this.feedContainer.nativeElement.scrollHeight);
  }

  ngAfterViewChecked() {
    this.scrolltoBottom();
 
   }

  showUsers() {
    this.af.auth.onAuthStateChanged((user)=>{
      if(user) {
        console.log("the user is:", user)
        this.currentUser_id = user.uid; 
        this.afs.collection("users").doc(`${user.uid}`).valueChanges().subscribe((user)=>{
          this.currentUser = user['displayName'];
        });      
      }
      else {
        console.log("No user :(");
      }
    })
  }

  queryMessage() {
    this.messages_db.valueChanges().subscribe((message_data) => {
      this.messages = message_data as message[];
    })

  }

  sendMessage(newMessage) {
   this.afs.collection(`chats/rhJKJtUW7QGLIRm4Jps1/messages`).add({uid:this.currentUser_id, user:this.currentUser, text:newMessage,time:Date.now()/1000});
  }

}
