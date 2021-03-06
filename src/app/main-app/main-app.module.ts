import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { GridsterModule } from 'angular-gridster2';

import { GmailWidgetComponent } from './widgets/gmail-widget/gmail-widget.component';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChartWidgetComponent } from './widgets/chart-widget/chart-widget.component';
import { GridElemDirective } from './directives/grid-elem.directive';
import { GoogleChartsModule } from 'angular-google-charts';
import { WidgetLoaderComponent } from './components/widget-loader/widget-loader.component';
import { GmailSenderPipe } from '../pipes/gmail-sender.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FilesUploadDirective } from './directives/FilesUpload/files-upload.directive'
import {FileUploadModule} from 'ng2-file-upload';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WidgetListModalComponent } from './modals/widget-list-modal/widget-list-modal.component';
import { WidgetDirective } from '../main-app/directives/WidgetDirective/widget.directive';
import { MatInputModule } from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';



export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  entryComponents: [
    GmailWidgetComponent,
    ChartWidgetComponent,
    WidgetListModalComponent
  ],
  declarations: [
    HomeComponent,
    GmailWidgetComponent,
    ChartWidgetComponent,
    GridElemDirective,
    WidgetLoaderComponent,
    GmailSenderPipe,
    FilesUploadDirective,
    WidgetDirective
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
    ScrollingModule,
    GoogleChartsModule.forRoot(),
    MatCheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FileUploadModule,
    MatProgressBarModule,
    MatInputModule,
    MatBadgeModule
  ],
  providers: []
})
export class MainAppModule { }
