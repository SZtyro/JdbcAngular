import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './data-base/table/table.component';
import { HomeComponent } from './main-app/components/home/home.component';
import { TableMenuComponent } from './data-base/table-menu/table-menu.component';
import { LoginWindowComponent } from './main-app/components/login-window/login-window.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'table/:tableName', component: TableComponent },
  { path: 'home', component: HomeComponent },
  { path: 'table', component: TableMenuComponent },
  { path: 'login', component: LoginWindowComponent },
  { path: '', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
