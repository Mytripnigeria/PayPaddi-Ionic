import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
// ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
// NgCharts
import { NgChartsModule } from 'ng2-charts';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'ios', swipeBackEnabled: false }),
    ReactiveFormsModule,
    AppRoutingModule,
    FlutterwaveModule,
    NgChartsModule,
  ],
  providers: [
    CurrencyPipe,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: DEFAULT_CURRENCY_CODE, useValue: '' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
