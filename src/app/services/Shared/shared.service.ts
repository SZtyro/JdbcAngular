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
  
  setEditGrid(){
    this.editGrid = !this.editGrid;
    this.editGridSubject.next(this.editGrid);
  }

  getEditGrid():Observable<boolean>{
    return this.editGridSubject.asObservable();
  }
}
