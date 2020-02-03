import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  TableComponent } from './data-base/table/table.component';
import { HomeComponent } from './main-app/home/home.component';
import { TableMenuComponent } from './data-base/table-menu/table-menu.component';

const routes: Routes = [
  { path: 'table/:tableName', component: TableComponent},
  { path: 'home', component: HomeComponent},
  { path: 'table', component: TableMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
