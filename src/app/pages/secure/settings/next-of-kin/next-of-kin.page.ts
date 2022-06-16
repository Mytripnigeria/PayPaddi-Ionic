import { DataService } from './../../../../services/data/data.service';
import { UtilityService } from './../../../../services/utility/utility.service';
import { UserService } from './../../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.page.html',
  styleUrls: ['./next-of-kin.page.scss'],
})
export class NextOfKinPage {
  edit_profile_form: FormGroup;
  nextOfKin = null;
  submit_attempt: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private userService: UserService,
    private dataService: DataService,
    private util: UtilityService,
    private actionSheetController: ActionSheetController
  ) {}

  ionViewWillEnter() {
    // Setup form
    this.nextOfKin = this.dataService.getUserNextofKin();
    console.log(this.nextOfKin);
    this.edit_profile_form = this.formBuilder.group({
      firstname: [this.nextOfKin.firstname, Validators.required],
      lastname: [this.nextOfKin.lastname, Validators.required],
      username: [this.nextOfKin.username, Validators.required],
      middlename: [this.nextOfKin.middlename, Validators.required],
      email: [
        this.nextOfKin.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      address: [this.nextOfKin.address, Validators.required],
      relationship: [this.nextOfKin.relationship, Validators.required],
      phone: [
        this.nextOfKin.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
    });
  }

  // Submit form
  async submit() {
    this.submit_attempt = true;

    // If form valid
    if (this.edit_profile_form.valid) {
      const loader = await this.util.loader('Updating');
      loader.present();
      const result = await this.userService.updateNextOfKin(
        this.edit_profile_form.value
      );

      if (!result.error) {
        await this.dataService.commitNextOfKin();
        loader.dismiss();
        console.log(result);

        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          'Next of kin saved',
          2000
        );
        this.navController.back();
      } else {
        loader.dismiss();
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          'Could not save next of kin',
          2000
        );
      }
    } else {
      // Display error message
      this.toastService.presentToast(
        'Error',
        'Please fill in all required fields',
        'top',
        'danger',
        2000
      );
    }
  }
}
