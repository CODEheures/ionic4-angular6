import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksListPage} from '../media/books/books-list/books-list.page';
import {CdListPage} from '../media/cd/cd-list/cd-list.page';
import {TabsPage} from './tabs.page';
import {AuthGuardService} from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/medias/tabs/(books:books)',
        pathMatch: 'full',
      },
      {
        path: 'books',
        outlet: 'books',
        component: BooksListPage,
        canActivate: [AuthGuardService]
      },
      {
        path: 'cd',
        outlet: 'cd',
        component: CdListPage,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/medias/tabs/(books:books)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
