import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-client.service';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/Shared/shared.service';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  //isSignedIn: boolean = false;
  isSignedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private http: HttpClientService,
    private auth: AuthService,
    public translate: TranslateService,
    private shared: SharedService
  ) {


  }

  ngOnDestroy(): void {
    this.shared.setShowNavBar(true);
    
  }
  

  ngOnInit() {
    //window.addEventListener('scroll', this.scrollFunction, true);
    this.isSignedIn$ = this.auth.isSignedIn()
    this.shared.setShowNavBar(false);
  }

  ngAfterViewInit() {
    //sthis.googleInit();
    //setTimeout(() => this.isSignedIn$ = this.auth.isSignedIn(), 1000);
  }

  tryLogin() {
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST',  "http://localhost:8080/token");
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Authorization', JSON.parse(localStorage.getItem("AuthInstance")));
    // xhr.onload = function () {
    //   console.log('Signed in as: ' + xhr.responseText);
    // };
    // xhr.send();
    this.http.tryLogin(JSON.parse(localStorage.getItem("AuthInstance"))).subscribe(d => console.log(d));
  }

  token;


  aaa() {
    //this.auth.attachSignin();
    //this.http.aaa(this.token ).subscribe(d=>console.log(d));
  }
  ttt() {
    this.http.ttt().subscribe((d) => { console.log(d) });
  }

  scrollToElement($element): void {
    //console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  scrollFunction() {
    //console.log(document.body.scrollTop)
    // if (window.pageYOffset > 20 || window.pageYOffset > 20) {
    //   document.getElementById("carouselExampleIndicators").style.top = "0";
    // } else {
    //   document.getElementById("carouselExampleIndicators").style.top = "-50px";
    // }
  }


}
