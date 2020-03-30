import { Component, OnInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from './services/http-client.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { TranslateService } from '@ngx-translate/core';
import { WidgetListModalComponent } from './main-app/widget-list-modal/widget-list-modal.component';
import { MatDialog } from '@angular/material';
import { SharedService } from './services/Shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {
  ngAfterContentInit(): void {
    

  }
  title = 'AngularJDBC';
  tableNames: String[] = [];
  opened: boolean = false;
  private user: SocialUser;
  private loggedIn: boolean = false;



  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService,
    public dialog: MatDialog,
    private shared: SharedService
  ) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    translate.use('en')
    
  }



  ngOnInit() {
    this.httpClientService.getTableNames().subscribe(
      data => {

        this.setTableNames(data);
        console.log("Home Table names fetched! ", data);


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
  
  editGrid(){
    this.shared.homeRef.editGrid = !this.shared.homeRef.editGrid;
  }

  openTable(name) {
    //this.router.navigate(['/home']);
    this.router.navigate(['/table', name]);
    
    this.router.onSameUrlNavigation = 'reload';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WidgetListModalComponent, {
      width: '80%',
      height: '80%',
      data: { father: this }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
