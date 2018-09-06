import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/medias/tabs/(books:books)', pathMatch: 'full' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule'},
  { path: 'medias', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
