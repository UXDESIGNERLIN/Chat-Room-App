import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { message } from 'src/app/message';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { user } from 'src/app/user';
import { User } from 'firebase';
import { ActivatedRoute } from '@angular/router';



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
  chatLanguageId: string;
  languages = this.activateRoute.snapshot.paramMap.get("language");
  

/*
  Chinese:string = "B0zv2nsBy4tBvrdRlxVl";
  English: string = "rhJKJtUW7QGLIRm4Jps1";
  Spanish: string = "rhJKJtUW7QGLIRm4Jps1";
  Catalan: string = "rhJKJtUW7QGLIRm4Jps1";
*/

  //messages_db: any = this.afs.collection(`chats/${this.chatLanguageId}/messages`, ref => ref.orderBy("time","asc").limit(100));
  messages_db: any;
  constructor(private auth: AuthService,
              private af: AngularFireAuth,
              private afs: AngularFirestore,
              private activateRoute: ActivatedRoute
 
              ) {
             

               }

  ngOnInit() { 
    this.languageId();
    this.showUsers();
    console.log(this.currentUser_id);
    this.queryMessage();
   // this.getUserbyId();
   console.log("LANGUAGE", this.chatLanguageId, this.messages_db);
    
  }

  languageId() {
    switch (this.languages) {
      case "chinese":
        this.chatLanguageId = "B0zv2nsBy4tBvrdRlxVl";
        break;
      case "english":
        this.chatLanguageId = "rhJKJtUW7QGLIRm4Jps1";
        break;
      case "spanish":
        this.chatLanguageId = "HtxNrwt8za0km0XWHcfu";
        break;
      case "catalan":
        this.chatLanguageId = "ofe9DsiULPjU4YbhuDTZ";
        break;
    }

    this.messages_db = this.afs.collection(`chats/${this.chatLanguageId}/messages`, ref => ref.orderBy("time","asc").limit(100));


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
    //this.languageId();
    this.messages_db.valueChanges().subscribe((message_data) => {
      this.messages = message_data as message[];
    })

  }

  sendMessage(newMessage) {
    console.log(newMessage);
   this.afs.collection(`chats/${this.chatLanguageId}/messages`).add({uid:this.currentUser_id, user:this.currentUser, text:newMessage,time:Date.now()/1000});
  }

}
