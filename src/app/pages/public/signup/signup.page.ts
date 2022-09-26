import { DataService } from 'src/app/services/data/data.service';
import { UtilityService } from './../../../services/utility/utility.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  current_year: number = new Date().getFullYear();
  error = false;
  signup_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private util: UtilityService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    console.log(this.containsSpecialChars('tolulope'));
    console.log(this.containsSpecialChars('tolu@lope'));
    console.log(this.containsSpecialChars('tolu)lope'));

    // Setup form
    this.signup_form = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      referral_code: [''],
      phone: [
        '',
        Validators.compose([
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required,
        ]),
      ],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      password_confirmation: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const result = specialChars.test(str);
    if (result) {
      this.error = true;
    } else {
      this.error = false;
    }
    return result;
  }

  passwordStrength(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const result = specialChars.test(str);
    if (result) {
      this.error = false;
    } else {
      this.error = true;
    }
    return result;
  }

  passwordMatch(confirm) {
    if (this.signup_form.value.password === confirm) {
      this.error = false;
      return true;
    } else {
      this.error = true;
      return false;
    }
  }

  hasWhiteSpace(str) {
    var inValid = /\s/;
    const result = inValid.test(str);
    if (result) {
      this.error = true;
    } else {
      this.error = false;
    }
    return result;
  }

  // Sign up
  async signUp() {
    this.submit_attempt = true;

    // If email or password empty
    if (
      this.signup_form.value.email == '' ||
      this.signup_form.value.password == '' ||
      this.signup_form.value.password_confirmation == ''
    ) {
      this.toastService.presentToast(
        'Error',
        'Please fill in all fields',
        'top',
        'danger',
        4000
      );

      // If passwords do not match
    } else if (
      this.signup_form.value.password !=
      this.signup_form.value.password_confirmation
    ) {
      this.toastService.presentToast(
        'Error',
        'Passwords must match',
        'top',
        'danger',
        4000
      );
    } else {
      this.signup_form.value.gender = 'male';

      const loader = await this.util.loader('Signing up');
      loader.present();
      const response = await this.auth.signUp(this.signup_form.value);
      console.log({ response: response.result });
      if (!response.result) {
        loader.dismiss();
        return this.toastService.presentToast(
          'Registration Error',
          'top',
          'danger',
          '',
          4000
        );
      }
      if (
        response.result &&
        response.result.status == 200 &&
        !response.result.data.error
      ) {
        this.util.storeItem(
          'accessToken',
          response.result.data.data.access_token
        );
        await this.dataService.commitAllData();
        this.toastService.presentToast('Welcome!', 'top', 'success', '', 4000);
        loader.dismiss();
        await this.router.navigate(['/home']);
      } else {
        loader.dismiss();
        const errorMsg = JSON.parse(response.result.data.data);
        console.log({ errorMsg });
        if (errorMsg.email) {
          this.toastService.presentToast(
            errorMsg.email,
            'top',
            'danger',
            '',
            4000
          );
        } else if (errorMsg.username) {
          this.toastService.presentToast(
            errorMsg.username,
            'top',
            'danger',
            '',
            4000
          );
        } else {
          this.toastService.presentToast(
            'Registration Error',
            'top',
            'danger',
            '',
            4000
          );
        }
      }

      // Success messages + routing

      // setTimeout(() => {
      //   loader.dismiss();
      // }, 2000);
      loader.dismiss();
    }
  }
}
