import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { message } from 'src/app/message';

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

  currentUser_Id;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    //this.auth.getCurrentUser().subscribe();
    this.showUsers();
    
//this.auth.state();
  }

  loadMessage() {

  }

  showUsers() {
    //this.auth.getCurrentUser()
    this.currentUser_Id = this.auth.getCurrentUser();
    //this.auth.getCurrentUser();
    console.log("Current User Id",this.currentUser_Id);
  }

}
