import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { message } from 'src/app/message';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-chat-language',
  templateUrl: './chat-language.page.html',
  styleUrls: ['./chat-language.page.scss'],
})
export class ChatLanguagePage implements OnInit {

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

  ]

  constructor(private auth: AuthService,
              private af: AngularFireAuth) { }

  ngOnInit() {
   
    this.showUsers();
    
//this.auth.state();
  }

  loadMessage() {

  }

  showUsers() {
    //this.auth.getCurrentUser()
    //this.currentUser_Id = this.auth.getCurrentUser();
    this.af.auth.onAuthStateChanged((user)=>{
      if(user) {
        console.log("the user is:", user.uid)
      }
      else {
        console.log("No user :(");
      }
    })
  }

}
