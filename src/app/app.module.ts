import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  TableComponent } from './data-base/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule, MatDialogModule, MatNativeDateModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from './data-base/delete-modal/delete-modal.component';
import { EditModalComponent } from './data-base/edit-modal/edit-modal.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddModalComponent } from './data-base/add-modal/add-modal.component';
import { MainAppModule } from './main-app/main-app.module';
import { DataBaseModule } from './data-base/data-base.module';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DeleteModalComponent,
    EditModalComponent,
    AddModalComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgbModule,
    MainAppModule,
    DataBaseModule
  ],
  entryComponents: [
    DeleteModalComponent,
    EditModalComponent,
    AddModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
