import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Directory, Filesystem } from '@capacitor/filesystem';
const IMAGE_DIR = 'transaction-images';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {
  transaction;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    this.transaction = this.navParams.data.transaction;
    console.log(this.transaction);
  }

  back() {
    this.modalCtrl.dismiss();
  }

  formatTime(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

  async capture() {
    html2canvas(document.querySelector('#capture')).then(async (canvas) => {
      // console.log(canvas);
      const base64Data = canvas.toDataURL();
      // document.querySelector('#capture').appendChild(canvas);
      const fileName = new Date().getTime() + '.png';
      const savedFile = await Filesystem.writeFile({
        directory: Directory.Documents,
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        recursive: true,
      });

      // const getFile = await Filesystem.getUri({
      //   directory: Directory.Documents,
      //   path: `${IMAGE_DIR}/${fileName}`,
      // });
      console.log(savedFile);

      this.fileOpener
        .showOpenWithDialog(savedFile.uri, 'image/jpeg')
        .then(() => console.log('File is opened'))
        .catch((e) => console.log('Error opening file', e));
    });
  }
}
