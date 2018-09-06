import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {Book} from '../../../../interfaces/medias/book';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.page.html',
  styleUrls: ['./books-list.page.scss'],
})
export class BooksListPage implements OnInit, OnDestroy {

  public books: Book[] = [];
  public booksSubscription: Subscription;

  constructor(private mediasService: MediasService) { }

  ngOnInit() {
    this.booksSubscription = this.mediasService.booksSubject.subscribe((books) => {
      this.books = books
    })
    this.mediasService.emitBooks()
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe()
  }
}
