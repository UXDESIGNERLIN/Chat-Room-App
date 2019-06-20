import { Component, OnInit } from '@angular/core';
import { chatroom } from 'src/app/chatroom';
import { FirebaseAuth } from '@angular/fire';
import { AuthService } from 'src/app/auth.service';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  chats: chatroom = {
    language: "Catalan",

  }



  constructor(private auth: AuthService, private dataBaseService: DatabaseService) { }

  ngOnInit() {
    this.test();
  }

  test() {
    this.dataBaseService.addUser();
  }

}
