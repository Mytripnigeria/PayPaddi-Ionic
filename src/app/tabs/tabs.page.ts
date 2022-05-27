import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private actionSheetController: ActionSheetController) {}

  // Select action
  async selectAction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Type of transfer',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Send to wallet',
          icon: 'wallet',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Send to local bank',
          icon: 'storefront',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Crossborder transfer',
          icon: 'earth',
          handler: () => {
            // Put in logic ...
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
