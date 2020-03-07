import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from './services/http-client.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularJDBC';
  tableNames: String[] = [];
  opened: boolean = false;
  private user: SocialUser;
  private loggedIn: boolean = false;



  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService
  ) { 
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    translate.use('en')
  }



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

  signInWithGoogle(): void {

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
