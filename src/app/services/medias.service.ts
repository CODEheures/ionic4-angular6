import { Injectable } from '@angular/core';
import {Book} from '../interfaces/medias/book';
import {Cd} from '../interfaces/medias/cd';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  private books: Book[] = [
    {
      title: 'moby dick',
      author: 'herman melville',
      isLent: true
    },
    {
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      isLent: false
    },
    {
      title: 'Le Meilleur des mondes',
      author: 'Aldous Huxley',
      isLent: true
    }
  ]


  private cds: Cd[] = [
    {
      title: 'Shine on you crazy diamond',
      artist: 'pink floyd',
      isLent: true
    },
    {
      title: 'En passant',
      artist: 'Jean-Jacques Goldman',
      isLent: true
    },
    {
      title: 'Thunderstuck',
      artist: 'AC/DC',
      isLent: false
    }
  ]

  public booksSubject: Subject<Book[]>
  public cdsSubject: Subject<Cd[]>

  constructor() {
    this.booksSubject = new Subject()
    this.cdsSubject = new Subject()
  }

  emitBooks() {
    this.booksSubject.next(this.books.slice())
  }

  emitCds() {
    this.cdsSubject.next(this.cds.slice())
  }

  getBookById(id: number): Book {
    return this.books[id]
  }

  getCdById(id: number): Cd {
    return this.cds[id]
  }
}
