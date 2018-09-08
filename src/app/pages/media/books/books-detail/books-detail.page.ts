import {Component, Input, OnInit} from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {Book} from '../../../../interfaces/medias/book';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.page.html',
  styleUrls: ['./books-detail.page.scss'],
})
export class BooksDetailPage implements OnInit {

  @Input() id: number;

  public book: Book;

  constructor(private mediasService: MediasService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.book = this.mediasService.getBookById(this.id)
  }

  toggleLent(event) {
    this.book.isLent = +event.detail.value === 1
  }

  onCloseModal() {
    this.modalCtrl.dismiss()
  }
}
