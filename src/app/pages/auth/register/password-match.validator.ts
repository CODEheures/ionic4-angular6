import {FormGroup} from '@angular/forms';

export class PasswordMatchValidator {

  static validate(passwordFormGroup: FormGroup) {

    const password = passwordFormGroup.value['password']
    const repeatPassword = passwordFormGroup.value['repeatPassword']
    console.log(password, repeatPassword)
    if (password === repeatPassword) {
      return null
    } else {
      return { doesMatchPassword: true }
    }

  }
}
