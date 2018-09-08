import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {Book} from '../../../../interfaces/medias/book';
import {Subscription} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {BooksDetailPage} from '../books-detail/books-detail.page';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.page.html',
  styleUrls: ['./books-list.page.scss'],
})
export class BooksListPage implements OnInit, OnDestroy {

  public books: Book[] = [];
  public booksSubscription: Subscription;

  constructor(private mediasService: MediasService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.booksSubscription = this.mediasService.booksSubject.subscribe((books) => {
      this.books = books
    })
    this.mediasService.emitBooks()
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe()
  }

  async onOpenDetail(i) {
    const modalDetail = await this.modalCtrl.create({
      component: BooksDetailPage,
      componentProps: {id: i}
    });
    return await modalDetail.present();
  }
}
