import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'appareils', pathMatch: 'full' },
  { path: 'appareils', loadChildren: './pages/appareils/appareils.module#AppareilsModule'},
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
