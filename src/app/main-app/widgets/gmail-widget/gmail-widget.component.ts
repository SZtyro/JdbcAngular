import { Component, OnInit} from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { GmailService, GMailContent } from 'src/app/services/Gmail/gmail.service';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MatTableDataSource } from '@angular/material';


interface GThread {
  id: number;
  threadId: number;
}

@Component({
  selector: 'app-gmail-widget',
  templateUrl: './gmail-widget.component.html',
  styleUrls: ['./gmail-widget.component.css']
})
export class GmailWidgetComponent implements OnInit, GridsterItem {

  //GRIDSTER
  x: number = 0;
  y: number = 0;
  cols: number = 8;
  rows: number = 3;

  //USER
  private user: SocialUser;

  //TABLE
  dataSource;
  displayedColumns: string[] = ['from', 'snippet'];

  //GMAIL CONTENT
  threads: GThread[];
  messages: GMailContent[] = [];


  constructor(
    private service: GmailService,
    private authService: AuthService) { }

  ngOnInit() {
    this.signInWithGoogle();
  }

  fetchMails() {
    this.service.getMessages(this.user.id, this.user.authToken).subscribe(messages => {

      this.threads = messages["messages"];

      //console.log(this.threads);
      this.threads.forEach((element, i) => {
        this.service.getMessage(this.user.id, this.user.authToken, this.threads[i].id).subscribe(d => {

          this.messages[i] = (d);

        });
      });
    },
      error => { console.log(error) },
      () => {
        this.messages.forEach((element, i) => {
          element.payload.headers.forEach(el => {
            if (el.name === "From")

              this.messages[i].from = el.value;
          })
        });
        this.dataSource = new MatTableDataSource(this.messages);
      }
    )
  }

  signInWithGoogle(): void {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.user = user;
      this.fetchMails();

    });
  }
}
