import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordMatchValidator} from './password-match.validator';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public passwordFormGroup: FormGroup
  public registerFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {validator: PasswordMatchValidator.validate.bind(this)})
    this.registerFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordFormGroup: this.passwordFormGroup
    })
  }

  async onSubmit() {
    try {
      await this.authService.register(this.registerFormGroup.value['email'], this.passwordFormGroup.value['password'])
      this.router.navigate(['/'])
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
