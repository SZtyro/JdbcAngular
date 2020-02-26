import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from './services/http-client.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularJDBC';
  tableNames: String[] = [];
  opened: boolean = true;
  private user: SocialUser;
  private loggedIn: boolean = false;



  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private authService: AuthService
  ) { }



  ngOnInit() {


    this.httpClientService.getTableNames().subscribe(
      data => {

        this.setTableNames(data);
        console.log("Table names fetched! ", data);


      },

      error => {

        console.log("Error", error);

      }
    )
  }
  test() {

    this.httpClientService.test(this.user.id, this.user.authToken).subscribe(data => {
      console.log(data);
      this.httpClientService.test2(this.user.id, this.user.authToken, "").subscribe(da => {
        console.log(da);
        this.httpClientService.test3(this.user.id, this.user.authToken, da).subscribe(xa => {
          console.log(xa);

        },

          error => {
            console.log(error);
          }
        )
      
      },

      error => {
        console.log(error);
      }
    )
  },

  error => {
  console.log(error);
}
    )


  }

signInWithGoogle(): void {
  console.log(GoogleLoginProvider.PROVIDER_ID)
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.authService.authState.subscribe((user) => {
    console.log(user);
    this.user = user;
    this.loggedIn = (user != null);

  });
}

signOut(): void {
  this.authService.signOut();
}

setTableNames(data) {
  this.tableNames = data;

}

openTable(name) {
  //this.router.navigate(['/home']);
  this.router.navigate(['/table', name]);

  this.router.onSameUrlNavigation = 'reload';
}
}
