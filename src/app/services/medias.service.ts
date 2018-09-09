import { Injectable } from '@angular/core';
import {Book} from '../interfaces/medias/book';
import {Cd} from '../interfaces/medias/cd';
import {Subject} from 'rxjs';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  private books: Book[] = []
  private cds: Cd[] = []

  public booksSubject: Subject<Book[]>
  public cdsSubject: Subject<Cd[]>

  constructor(private storage: Storage) {
    this.booksSubject = new Subject()
    this.cdsSubject = new Subject()
  }

  emitBooks() {
    this.storage.set('books', this.books)
    this.booksSubject.next(this.books.slice())
  }

  emitCds() {
    this.storage.set('cds', this.cds)
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
    this.emitBooks()
    this.cds.forEach((cd) => {
      cd.isLent = false
      cd.lentBy = ''
    })
    this.emitCds()
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
      this.books = books.val() ? books.val() : []
      this.cds = cds.val() ? cds.val() : []
      this.emitBooks()
      this.emitCds()
    } catch (e) {
      const error = e as firebase.FirebaseError
      throw error.message
    }
  }

  async getAllFromDevice() {
    try {
      const books = await this.storage.get('books')
      const cds = await this.storage.get('cds')
      this.books = books && books.length ? books : []
      this.cds = cds && cds.length ? cds : []
      this.emitBooks()
      this.emitCds()
    } catch (e) {
      throw e
    }

  }
}
