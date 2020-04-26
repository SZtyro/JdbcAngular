import { Injectable, HostListener, AfterViewInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AfterViewInit {
  public auth2: any;
  token: string;
  name: String;
  public imageUrl: String;
  email: String;
  expireTime: number = 0;
  options;
  GoogleUser
  user = new Subject<UserData>();

  constructor(
    //private http:HttpClientService,
    private router: Router
  ) {

    this.googleInit();
    //sessionStorage.clear
    //this.GoogleUser = JSON.parse( sessionStorage.getItem("GoogleUser") );
    //console.log(this.GoogleUser);
    //if (this.GoogleUser != null)
    //  console.log(this.GoogleUser)

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.setUserData(gapi.auth2.getAuthInstance().currentUser.ie.Pt.fL);
  }

  setUserData(imageUrl) {
    this.user.next(new UserData(imageUrl))
  }

  getUserData(): Observable<UserData> {
    return this.user.asObservable()
  }
  validate() {
    //console.log(this.GoogleUser.id_token)
    //console.log(this.auth2.AuthResponse)
    console.log(gapi.auth2.getAuthInstance().currentUser.ie.Pt.fL)
    console.log(gapi.auth2.getAuthInstance().isSignedIn.ie);
    //console.log(this.GoogleUser.isSignedIn())
    //console.log(this.GoogleUser.getGrantedScopes())
  }
  signIn() {
    //this.options = new gapi.auth2.SigninOptionsBuilder();
    //this.options.setAppPackageName('com.example.app');
    //this.options.setFetchBasicProfile(true);
    //this.options.setPrompt('select_account');
    //this.options.setScope('profile').setScope('email');
    this.auth2.signIn({
      scope: 'profile email',
      prompt: 'select_account',
      ux_mode: 'redirect',
      redirect_uri: 'http://localhost:4200/home'
    }).then(result => {
      //console.log(result.isSignedIn());
      this.imageUrl = gapi.auth2.getAuthInstance().currentUser.ie.Pt.fL;
      console.log(this.imageUrl);
      this.setUserData(gapi.auth2.getAuthInstance().currentUser.ie.Pt.fL);
    });;
  }

  signOut() {

    gapi.auth2.getAuthInstance().disconnect();
    this.setUserData(null);

  }

  public attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.GoogleUser = this.auth2.currentUser.get();
        console.log(this.auth2.getAuthResponse())
        //sessionStorage.setItem("GoogleUser",JSON.stringify(this.GoogleUser.getAuthResponse()) );
        let profile = googleUser.getBasicProfile();
        this.token = googleUser.getAuthResponse().id_token;
        //console.log('Token || ' + googleUser.getAuthResponse().id_token);
        //console.log('ID: ' + profile.getId());
        this.name = profile.getName();
        this.imageUrl = profile.getImageUrl();
        this.email = profile.getEmail();
        //YOUR CODE HERE
        this.expireTime = (googleUser.getAuthResponse().expires_in) / 60;
        //this.http.loginUser(["sd","sd","sds"]);
        //this.http.tryLogin(googleUser.getAuthResponse().id_token).subscribe(d=>console.log(d));
        console.log("sekundy :" + Date.now());
        let now = Date.now();
        this.expireTime = now + googleUser.getAuthResponse().expires_in * 1000;
        console.log("wygasnie :" + this.expireTime);
        console.log("data " + new Date(this.expireTime));
        //this.router.navigate(['/home']);
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '36592518046-43kubsqj6gut5165dugs9u0cha4e0hah.apps.googleusercontent.com',
        cookiepolicy: 'none',
        scope: 'profile email'
      });
      //this.attachSignin(document.getElementById('googleBtn'));
      //console.log("google initialized" + document.getElementById('googleBtn'))
      //console.log(this.auth2.isSignedIn.get());
      //console.log(this.auth2.currentUser.ie);
      this.auth2.currentUser.listen((d) => {
        if (d.Pt != null)
          this.setUserData(d.Pt.fL)
        else
          this.setUserData(null);
      })
      console.log(this.auth2);
    });

  }



};




class UserData {
  name: String;
  imageUrl: String;

  constructor(image) {
    this.imageUrl = image;
  }
}