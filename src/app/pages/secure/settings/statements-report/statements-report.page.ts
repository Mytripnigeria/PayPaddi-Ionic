import { IonRouterOutlet } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statements-report',
  templateUrl: './statements-report.page.html',
  styleUrls: ['./statements-report.page.scss'],
})
export class StatementsReportPage implements OnInit {
  constructor(public routerOutlet: IonRouterOutlet) {}

  ngOnInit() {}
}
