import { Injectable, HostListener, AfterViewInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { SharedService } from '../Shared/shared.service';
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AfterViewInit {
  public auth2: any;

  isSigned = new BehaviorSubject<boolean>(false);
  //isLoggedIn: boolean;
  authInstance = null;
  googleInitialized: boolean = false;

  constructor(
    private http: HttpClientService,
    private router: Router,
    private shared: SharedService
  ) {
    //this.isSigned.subscribe((data) => { this.isLoggedIn = data });
    this.googleInit();

    // this.authInstance = JSON.parse(localStorage.getItem("AuthInstance"));
    // if (this.authInstance != null) {
    //   console.log("pobrana instancja z session storage: ")
    //   console.log(this.authInstance);

    // }
  }

  ngAfterViewInit(): void {

  }

  isSignedIn() {
    console.log('funkcja zwaracjaca observable')
    return this.isSigned.asObservable();
  }

  sendToken() {
    console.log(this.getAuthInstance().currentUser.ie.tc.id_token);
    this.http.aaa(this.getAuthInstance().currentUser.ie.tc.id_token).subscribe(answer => { console.log(answer) })
  }

  signIn() {
    this.getAuthInstance().signIn({
      scope: 'profile email',
      prompt: 'select_account',
      //ux_mode: 'redirect',
      //redirect_uri: 'http://localhost:4200/home'
    }).then(googleUser => {
      //console.log(googleUser.getAuthResponse().id_token)
      localStorage.setItem("AuthInstance", JSON.stringify(this.getAuthInstance().currentUser));

      this.http.tryLogin(googleUser.getAuthResponse().id_token).subscribe(answer => {
        if (answer) {
          this.shared.setIsUserLogged(answer);
          this.router.navigate(['/home']).then(() => {
            //window.location.reload();
            //this.isSigned.next(true);
            //console.log('wyslano true')
          });
        }
        else {
          console.log("Wystapil blad logowania");
        }
      })
      //this.router.navigate(['/home'])
      //this.imageUrl = gapi.auth2.getAuthInstance().currentUser.ie.Pt.fL;

      //this.setUserData(gapi.auth2.getAuthInstance().currentUser.ie.Pt.fL);
    });

  }

  signOut() {
    localStorage.setItem("AuthInstance", null);
    console.log("logging out");
    gapi.auth2.getAuthInstance().disconnect();
    this.isSigned.next(false);
    this.router.navigate([''])
  }

  // public attachSignin(element) {

  //   this.auth2.attachClickHandler(element, {},
  //     (googleUser) => {
  //       this.GoogleUser = this.auth2.currentUser.get();
  //       console.log(this.auth2.getAuthResponse())
  //       //sessionStorage.setItem("GoogleUser",JSON.stringify(this.GoogleUser.getAuthResponse()) );
  //       let profile = googleUser.getBasicProfile();
  //       this.token = googleUser.getAuthResponse().id_token;
  //       //console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //       //console.log('ID: ' + profile.getId());
  //       this.name = profile.getName();
  //       this.imageUrl = profile.getImageUrl();
  //       this.email = profile.getEmail();
  //       //YOUR CODE HERE
  //       this.expireTime = (googleUser.getAuthResponse().expires_in) / 60;
  //       //this.http.loginUser(["sd","sd","sds"]);
  //       //this.http.tryLogin(googleUser.getAuthResponse().id_token).subscribe(d=>console.log(d));
  //       console.log("sekundy :" + Date.now());
  //       let now = Date.now();
  //       this.expireTime = now + googleUser.getAuthResponse().expires_in * 1000;
  //       console.log("wygasnie :" + this.expireTime);
  //       console.log("data " + new Date(this.expireTime));
  //       //this.router.navigate(['/home']);
  //     }, (error) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     });
  // }

  getAuthInstance() {
    if (this.googleInitialized) {
      return gapi.auth2.getAuthInstance();
    }
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '36592518046-43kubsqj6gut5165dugs9u0cha4e0hah.apps.googleusercontent.com',
        cookiepolicy: 'none',
        scope: 'profile email'
      }).then(() => {
        this.googleInitialized = true;
        console.log("Google initialized")
        //console.log(this.auth2..isSignedIn.get());
        this.isSigned.next(gapi.auth2.getAuthInstance().isSignedIn.get());

        //localStorage.setItem("AuthInstance", JSON.stringify(this.getAuthInstance().currentUser.ie.tc.id_token) );
        //this.authInstance = JSON.parse(localStorage.getItem("AuthInstance"));
        //if (this.authInstance != null) {
        //  console.log("pobrana instancja z session storage: ")
        //  console.log(this.authInstance);
        //this.http.tryLogin(this.authInstance);
        //}
      }

      );

      // this.auth2.currentUser.listen((d) => {
      //   if (d.Pt != null)
      //     this.setUserData(d.Pt.fL)
      //   else
      //     this.setUserData(null);
      // })
      // console.log(this.auth2);


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