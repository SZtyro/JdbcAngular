import { Injectable } from '@angular/core';
import { HomeComponent } from 'src/app/main-app/components/home/home.component';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  homeRef:HomeComponent;
  private editGrid: boolean = false;
  private editGridSubject = new Subject<boolean>();

  private dbConnnection: boolean = false;
  private dbConnnectionSubject = new Subject<boolean>();

  private isUserLogged: boolean = false;
  private isUserLoggedSubject = new Subject<boolean>();
  
  setIsUserLogged(isLogged){
    this.isUserLogged = isLogged;
    this.isUserLoggedSubject.next(this.isUserLogged);
  }

  getIsUserLogged():Observable<boolean>{
    return this.isUserLoggedSubject.asObservable();
  }

  setdbConnnection(){
    this.dbConnnection = !this.dbConnnection;
    this.dbConnnectionSubject.next(this.dbConnnection);
  }

  getdbConnnection():Observable<boolean>{
    return this.dbConnnectionSubject.asObservable();
  }

  setEditGrid(){
    this.editGrid = !this.editGrid;
    this.editGridSubject.next(this.editGrid);
  }

  getEditGrid():Observable<boolean>{
    return this.editGridSubject.asObservable();
  }
}
