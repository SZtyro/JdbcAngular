import { Component, OnInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from './services/http-client.service';
//import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { TranslateService } from '@ngx-translate/core';
import { WidgetListModalComponent } from './main-app/modals/widget-list-modal/widget-list-modal.component';
import { MatDialog } from '@angular/material';
import { SharedService } from './services/Shared/shared.service';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngAfterContentInit(): void {
    

  }
  title = 'AngularJDBC';
  tableNames: String[] = [];
  dbConnection: boolean = false;
  opened: boolean = false;
  photoUrl:String;


  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    //private authService: AuthService,
    public translate: TranslateService,
    public dialog: MatDialog,
    private shared: SharedService,
    private auth: AuthService
  ) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    translate.use('en')
    //this.auth.getUserData().subscribe(userData => {this.photoUrl = userData.imageUrl})
    //console.log(this.auth.auth2.currentUser)
  }

  signOut(){
    this.auth.getUserData().subscribe().unsubscribe();
    this.router.navigate([''])
    this.auth.signOut();
  }
  

  ngOnInit() {
    this.subscribeDBConnection();
    this.photoUrl = this.auth.imageUrl;
    console.log(this.photoUrl)
  }

  subscribeDBConnection(){
    this.shared.getdbConnnection().subscribe(data=> {
      if(data){
        //Fetching table names
        this.httpClientService.getTableNames().subscribe(
          data => {   
            this.setTableNames(data);
            //console.log("Home Table names fetched! ", data);   
          },  
          error => {    
            console.log("Error", error);  
          }
        )
      }
      this.dbConnection = data
    });
  }


  setTableNames(data) {
    this.tableNames = data;

  }
  
  editGrid(){
    this.shared.setEditGrid();
    this.shared.homeRef.options.draggable.enabled = !this.shared.homeRef.options.draggable.enabled;
    this.shared.homeRef.options.resizable.enabled = !this.shared.homeRef.options.resizable.enabled;
    this.shared.homeRef.options.api.optionsChanged();
   
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
