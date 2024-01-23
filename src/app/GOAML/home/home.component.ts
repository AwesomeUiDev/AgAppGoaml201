import { Component, OnInit } from '@angular/core';
// import { UserLogin } from '../user-login/user-login';
import { Router } from '@angular/router';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msgs: any;
  countForMessage: any;
  userId: any;
  role: any;
  // user: UserLogin = new UserLogin();
  constructor(private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('roleForUser');
    console.log(this.userId);
    console.log(this.role);
    this.getMessages();
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('roleForUser');
    this.router.navigate(['/', 'login']);
  }
  getMessages(): void {
    this.messageService.getAllMessages()
      .subscribe(
        (msgs) => {
          this.msgs = msgs,
            console.log(this.msgs);
          let count = 0;
          for (let index = 0; index < this.msgs.length; index++) {
            if (( this.role == "V") && this.msgs[index].msgStatus == "U" && this.msgs[index].msgType == "G") {
              console.log("if");
              count++;
            } else if (this.role == "U" && this.msgs[index].msgStatus == "U" && this.msgs[index].msgType == "R") {
              console.log("if else");
              count++;
            }
          }


          console.log(count);
          this.countForMessage = count;

        }
        
      );
  }
}
