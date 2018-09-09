import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  public connectFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.connectFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    try {
      await this.authService.connect(this.connectFormGroup.value['email'], this.connectFormGroup.value['password'])
      this.router.navigate(['/'])
      const toast = await this.toastCtrl.create({
        message: 'Vous êtes bien connecté',
        position: 'bottom',
        duration: 4000
      })
      return await toast.present()
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: error,
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Fermer'
      })
      return await toast.present()
    }
  }

}
