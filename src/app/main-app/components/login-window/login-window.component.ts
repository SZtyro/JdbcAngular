import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/Shared/shared.service';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})
export class LoginWindowComponent implements OnInit {

  private userName: String = "";
  private password: String = "";
  private url:String = "";
  


  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private shared:SharedService
    ) { }


  ngOnInit() {
    this.url = JSON.parse(localStorage.getItem('url'));
    this.userName = JSON.parse(localStorage.getItem('userName'));
  }

  login(){
   
    this.httpClientService.loginUser([this.url,this.userName,this.password]).subscribe(
      data=> {
        
        if(data === "acces"){
          localStorage.setItem('url', JSON.stringify(this.url));
          localStorage.setItem('userName', JSON.stringify(this.userName));
          this.router.navigate(['/home'])
          this.shared.setdbConnnection();
        }
        
      }
    );
  }

}
