import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { message } from 'src/app/message';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { user } from 'src/app/user';
import { NavParams, NavController } from '@ionic/angular';


@Component({
  selector: 'app-chat-language',
  templateUrl: './chat-language.page.html',
  styleUrls: ['./chat-language.page.scss'],
})  
export class ChatLanguagePage implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;

  currentUser_id: string;

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

  messages_db = this.afs.collection('chats/rhJKJtUW7QGLIRm4Jps1/messages', ref => ref.orderBy("time","asc").limit(100));

  constructor(private auth: AuthService,
              private af: AngularFireAuth,
              private afs: AngularFirestore,
 
              ) {
             

               }

  ngOnInit() { 
    this.showUsers();
    console.log(this.currentUser_id);
    this.queryMessage();
    
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
   this.afs.collection(`chats/rhJKJtUW7QGLIRm4Jps1/messages`).add({uid:this.currentUser_id, text:newMessage, time:Date.now()/1000});
  }
/*
  getUserbyId() {
    
    //Read uid from the collections 
    this.messages_db.valueChanges().subscribe((message_data) => {
      message_data.map((d:any)=>{
        //console.log("dataa",d.uid);
        this.afs.collection(`chats/rhJKJtUW7QGLIRm4Jps1/messages`, ref => ref.where('uid', '==', this.currentUser_id)).valueChanges().subscribe((user)=>{
         
          //this.afs.doc(`users/1`).valueChanges().subscribe(c=>console.log(c))
        })
     

      })
    })
  }
 */ 

 


}
