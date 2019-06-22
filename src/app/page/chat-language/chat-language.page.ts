import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { message } from 'src/app/message';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-chat-language',
  templateUrl: './chat-language.page.html',
  styleUrls: ['./chat-language.page.scss'],
})
export class ChatLanguagePage implements OnInit {

  currentUser_id: string;

  messages: message[] = [
    {
      uid:"",
      user: "",
      text: "",
      time: Date.now()/1000
    }
  ];


/*Data simulation 
  messages: message[] = [
    {
      uid:"",
      user: "Dog",
      message: "Welcome everybdy",
      time: + (Date.now)/1000,
    }, 
    {
      uid: "",
      user: "Cat",
      message: "Meow",
      time: + (Date.now)/1000,
    },
    {
      uid: this.currentUser_id,
      user: "current",
      message: "Mouuu",
      time: + (Date.now)/1000,
    },
    {
      uid: this.currentUser_id,
      user: "current",
      message: "Mouuu",
      time: + (Date.now)/1000,
    },       

  ]
*/
  

  constructor(private auth: AuthService,
              private af: AngularFireAuth,
              private afs: AngularFirestore,
              ) {


               }

  ngOnInit() {
   
    this.showUsers();
    console.log(this.currentUser_id);
    this.queryMessage();
    
//this.auth.state();
  }

  showUsers() {
    //this.auth.getCurrentUser()
    //this.currentUser_Id = this.auth.getCurrentUser();
    this.af.auth.onAuthStateChanged((user)=>{
      if(user) {
        console.log("the user is:", user.uid)
        this.currentUser_id = user.uid;
        
      }
      else {
        console.log("No user :(");
      }
    })
  }

  queryMessage() {
    //let chatsCollection = this.afs.collection<any>('chats');
    let messages_db = this.afs.collection('chats/rhJKJtUW7QGLIRm4Jps1/messages', ref => ref.limit(30));
    messages_db.valueChanges().subscribe((message_data) => {
      console.log(this.messages, message_data);
      this.messages = message_data as message[];
    })
  }

  sendMessage(newMessage) {
   this.afs.collection('chats/rhJKJtUW7QGLIRm4Jps1/messages').add({uid:this.currentUser_id, text:newMessage, time:Date.now()/1000});
  }




}
