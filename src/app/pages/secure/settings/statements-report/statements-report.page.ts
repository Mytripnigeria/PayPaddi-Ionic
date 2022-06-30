import { ToastService } from 'src/app/services/toast/toast.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { UserService } from 'src/app/services/user/user.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-statements-report',
  templateUrl: './statements-report.page.html',
  styleUrls: ['./statements-report.page.scss'],
})
export class StatementsReportPage implements OnInit {
  customPopoverOptions: any = {
    message: 'Select one',
    cssClass: 'popover-in-modal',
  };

  date_from_active: boolean = false;
  date_to_active: boolean = false;

  date_from: any;
  date_to: any;

  constructor(
    public routerOutlet: IonRouterOutlet,
    private util: UtilityService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  toggleDateFrom() {
    this.date_from_active = this.date_from_active ? false : true;
    this.date_to_active = false;
  }

  // Toggle date to
  toggleDateTo() {
    this.date_to_active = this.date_to_active ? false : true;
    this.date_from_active = false;
  }

  // On date from select
  onDateFromSelect(event: any) {
    this.date_from = format(parseISO(event.detail.value), 'yyyy/dd/mm');
    this.date_from_active = false;
  }

  // On date to select
  onDateToSelect(event: any) {
    this.date_to = format(parseISO(event.detail.value), 'yyyy/dd/mm');
    this.date_to_active = false;
  }

  async getReport() {
    const payload = {
      start_from: this.date_from,
      end_at: this.date_to,
    };
    const loader = await this.util.loader('Preparing');
    loader.present();
    const response = await this.userService.getStatement(payload);
    loader.dismiss();
    if (response.result) {
      if (!response.result.data.error) {
        this.toastService.presentToast(
          'Success',
          'top',
          'success',
          'The account statement has been sent to your email. It may take 5 minutes to arrive.',
          4000
        );
      } else {
        this.toastService.presentToast(
          'Error',
          'top',
          'danger',
          response.result.data.message,
          2000
        );
      }
    } else {
      this.toastService.presentToast(
        'Error',
        'top',
        'danger',
        'Unable to get your account statement at this time, try again later',
        2000
      );
    }
  }
}
