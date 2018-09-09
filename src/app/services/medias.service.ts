import { Injectable } from '@angular/core';
import {Book} from '../interfaces/medias/book';
import {Cd} from '../interfaces/medias/cd';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  private books: Book[] = [
    {
      title: 'moby dick',
      author: 'herman melville',
      isLent: true,
      lentBy: 'Mickael For'
    },
    {
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      isLent: false,
      lentBy: ''
    },
    {
      title: 'Le Meilleur des mondes',
      author: 'Aldous Huxley',
      isLent: true,
      lentBy: 'Pit Norris'
    }
  ]


  private cds: Cd[] = [
    {
      title: 'Shine on you crazy diamond',
      artist: 'pink floyd',
      isLent: false,
      lentBy: ''
    },
    {
      title: 'En passant',
      artist: 'Jean-Jacques Goldman',
      isLent: true,
      lentBy: 'Tina Handy'
    },
    {
      title: 'Thunderstuck',
      artist: 'AC/DC',
      isLent: false,
      lentBy: ''
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
    return Object.assign({}, this.books[id])
  }

  getCdById(id: number): Cd {
    return Object.assign({}, this.cds[id])
  }

  lentOffAll() {
    this.books.forEach((book) => {
      book.isLent = false
      book.lentBy = ''
    })
    this.cds.forEach((cd) => {
      cd.isLent = false
      cd.lentBy = ''
    })
  }

  saveBook(index: number, book: Book) {
    this.books[index] = book
    if (!book.isLent) {
      this.books[index].lentBy = ''
    }
    this.emitBooks()
  }

  saveCd(index: number, cd: Cd) {
    this.cds[index] = cd
    if (!cd.isLent) {
      this.cds[index].lentBy = ''
    }
    this.emitCds()
  }

  async saveAllToRemote() {
    try {
      await firebase.database().ref('medias/books').set(this.books)
      await firebase.database().ref('medias/cds').set(this.cds)
    } catch (e) {
      const error = e as firebase.FirebaseError
      throw error.message
    }
  }

  async getAllFromRemote() {
    try {
      const books = await firebase.database().ref('medias/books').once('value')
      const cds = await firebase.database().ref('medias/cds').once('value')
      this.books = books.val()
      this.cds = cds.val()
      this.emitBooks()
      this.emitCds()
    } catch (e) {
      const error = e as firebase.FirebaseError
      throw error.message
    }
  }
}
