import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksListPage} from '../media/books/books-list/books-list.page';
import {CdListPage} from '../media/cd/cd-list/cd-list.page';
import {TabsPage} from './tabs.page';
import {BooksDetailPage} from '../media/books/books-detail/books-detail.page';
import {CdDetailPage} from '../media/cd/cd-detail/cd-detail.page';

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
      },
      {
        path: 'books/:id',
        outlet: 'books',
        component: BooksDetailPage
      },
      {
        path: 'cd',
        outlet: 'cd',
        component: CdListPage
      },
      {
        path: 'cd/:id',
        outlet: 'cd',
        component: CdDetailPage
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
