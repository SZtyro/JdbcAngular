import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { TileComponent } from './tile/tile.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReminderWidgetComponent } from './reminder-widget/reminder-widget.component'
import {MatGridListModule} from '@angular/material/grid-list';
import { GridsterModule } from 'angular-gridster2';
import { GmailWidgetComponent } from './widgets/gmail-widget/gmail-widget.component';
import {MatTableModule} from '@angular/material/table';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    HomeComponent,
    TileComponent,
    ReminderWidgetComponent,
    GmailWidgetComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    RouterModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    GridsterModule,
    MatTableModule,
    ScrollingModule
    
  ]
})
export class MainAppModule { }
