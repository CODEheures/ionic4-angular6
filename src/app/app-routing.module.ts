import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/medias/tabs/(books:books)', pathMatch: 'full' },
  { path: 'settings', canActivate: [AuthGuardService], loadChildren: './pages/settings/settings.module#SettingsModule'},
  { path: 'medias', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'connect', loadChildren: './pages/auth/connect/connect.module#ConnectPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
