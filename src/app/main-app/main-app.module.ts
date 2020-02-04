import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from './tile/tile.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    HomeComponent,
    TileComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    RouterModule,
    MatMenuModule
  ]
})
export class MainAppModule { }
