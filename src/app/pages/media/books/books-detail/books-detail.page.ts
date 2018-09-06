import { Component, OnInit } from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../../../interfaces/medias/book';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.page.html',
  styleUrls: ['./books-detail.page.scss'],
})
export class BooksDetailPage implements OnInit {

  public book: Book;

  constructor(private mediasService: MediasService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.book = this.mediasService.getBookById(+id)
  }

  toggleLent(event) {
    this.book.isLent = +event.detail.value === 1
  }
}
