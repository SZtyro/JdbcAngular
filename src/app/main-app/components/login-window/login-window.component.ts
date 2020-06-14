import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '70px',
        opacity: 1
      })),
      state('closed', style({
        width: '0px',
        opacity: 0
      })),
      transition('open => closed', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('closed => open', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
    ]),
    trigger('loginDetails', [
      // ...
      state('open', style({
        height: '560px',
        opacity: 1
      })),
      state('closed', style({
        height: '120px',

      })),
      transition('open => closed', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('closed => open', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
    ]),

  ],

})
export class LoginWindowComponent implements OnInit {

  editing = false;
  editingDetails = false;
  databaseNames = [];
  datbaseTables = [];

  userName: String = "";
  password: String = "";
  url: String = "";
  dataBase: String = "";
  port: String = "";

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private shared: SharedService,
    private db: DatabaseService
  ) { }


  ngOnInit() {
    this.url = JSON.parse(localStorage.getItem('url'));
    this.userName = JSON.parse(localStorage.getItem('userName'));
    this.dataBase = JSON.parse(localStorage.getItem('dataBase'));
    this.port = JSON.parse(localStorage.getItem('port'));

    this.httpClientService.getConnectedBase().subscribe(d => console.log(this.databaseNames[0] = d))
  }

  login() {

    this.httpClientService.loginUser([this.url, this.port, this.dataBase, this.userName, this.password]).subscribe(
      data => {

        if (data === "acces") {
          localStorage.setItem('url', JSON.stringify(this.url));
          localStorage.setItem('userName', JSON.stringify(this.userName));
          localStorage.setItem('dataBase', JSON.stringify(this.dataBase));
          localStorage.setItem('port', JSON.stringify(this.port));
          //this.router.navigate(['/home'])
          this.shared.setdbConnnection();
          this.databaseNames[0] = this.dataBase;
          this.editingDetails = false;
        }

      }
    );
  }

  setEditing(hover: boolean) {
    this.editing = hover;
  }

  setEditingDetails() {
    this.editingDetails = !this.editingDetails;
  }

  fetchTables() {
    console.log('fetching tables')
    this.httpClientService.getTableNames().subscribe(tables => {
      console.log(tables)
      this.datbaseTables = tables
    })
  }

  openTable(tableName){
    this.router.navigate(['/table', tableName]);
    this.router.onSameUrlNavigation = 'reload';
  }
}
