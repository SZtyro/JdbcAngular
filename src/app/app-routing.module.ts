import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  TableComponent } from './data-base/table/table.component';
import { HomeComponent } from './main-app/home/home.component';


const routes: Routes = [
  { path: 'table/:tableName', component: TableComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
