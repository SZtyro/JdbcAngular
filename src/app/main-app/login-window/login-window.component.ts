import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  private userName: String = "";
  private password: String = "";
  private url:String = "";
  


  constructor(
    private httpClientService: HttpClientService,
    private router: Router) { }


  ngOnInit() {
    this.url = JSON.parse(localStorage.getItem('url'));
    this.userName = JSON.parse(localStorage.getItem('userName'));
  }

  login(){
    console.log(this.userName +" "+ this.password);
    this.httpClientService.loginUser([this.url,this.userName,this.password]).subscribe(
      data=> {
        console.log(data);
        if(data === "acces"){
          localStorage.setItem('url', JSON.stringify(this.url));
          localStorage.setItem('userName', JSON.stringify(this.userName));
          this.router.navigate(['/home'])
        }
        
      }
    );
  }

}