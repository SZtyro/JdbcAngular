import { Injectable } from '@angular/core';
import { HomeComponent } from 'src/app/main-app/components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  homeRef:HomeComponent;

  
}
