import {Component, Input, OnInit} from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {Book} from '../../../../interfaces/medias/book';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.page.html',
  styleUrls: ['./books-detail.page.scss'],
})
export class BooksDetailPage implements OnInit {

  @Input() id: number;

  public book: Book;
  public bookFormGroup: FormGroup;

  constructor(private mediasService: MediasService,
              private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.book = this.mediasService.getBookById(this.id)

    this.bookFormGroup = this.formBuilder.group({
      lentBy: [this.book.lentBy, Validators.required]
    })
  }

  toggleLent(event) {
    this.book.isLent = +event.detail.value === 1
  }

  onCloseModal() {
    this.modalCtrl.dismiss()
  }

  async saveMe() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Enregistrer le nouvel état de ce livre?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: () => {
            this.mediasService.saveBook(this.id, this.book)
            this.onCloseModal()
          }
        }
      ]
    })
    return await alert.present()
  }
}
