import { CardsService } from 'src/app/services/cards/cards.service';
import { TransferService } from './../../../services/transfer/transfer.service';
import { UserService } from './../../../services/user/user.service';
import { DataService } from './../../../services/data/data.service';
import { UtilityService } from './../../../services/utility/utility.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  current_year: number = new Date().getFullYear();

  signin_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private util: UtilityService,
    private auth: AuthService,
    private userService: UserService,
    private transferService: TransferService,
    private dataService: DataService,
    private cardsService: CardsService
  ) {}

  ngOnInit() {
    // Setup form
    this.signin_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });

    // DEBUG: Prefill inputs
    // this.signin_form.get('email').setValue('john.doe@mail.com');
    // this.signin_form.get('password').setValue('123456');
  }

  // Sign in
  async signIn() {
    this.submit_attempt = true;

    // If email or password empty
    if (
      this.signin_form.value.email == '' ||
      this.signin_form.value.password == ''
    ) {
      this.toastService.presentToast(
        'Error',
        'Please input email and password',
        'top',
        'danger',
        2000
      );
    } else {
      const loader = await this.util.loader('Signing in');
      loader.present();
      const req = await this.auth.signIn(this.signin_form.value);
      console.log(req);
      const response = req.result.data;
      if (req.result.status == 200 && !response.error) {
        // this.toastService.presentToast('Welcome!', 'top', 'success', '', 4000);
        this.util.storeItem('accessToken', response.data.access_token);
        await this.dataService.commitAllData();
        loader.dismiss();
        await this.router.navigate(['/home']);
      } else {
        this.toastService.presentToast(
          response.message,
          'top',
          'danger',
          '',
          4000
        );
      }

      loader.dismiss();
    }
  }
}
