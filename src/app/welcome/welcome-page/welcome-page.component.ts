import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-client.service';
import { AuthService } from 'src/app/services/Auth/auth.service';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  
  constructor(
    private router : Router,
    private http: HttpClientService,
    private auth: AuthService
    ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //sthis.googleInit();
    
  }

  tryLogin(token){
    this.http.tryLogin(token).subscribe(d=>console.log(d));
  }

  token;
  
 
  aaa(){
  //this.auth.attachSignin();
   //this.http.aaa(this.token ).subscribe(d=>console.log(d));
  }
  ttt(){
    this.http.ttt();
  }
}
