"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9497],{106:(P,h,t)=>{t.d(h,{n:()=>v});var l=t(2096);let v=(()=>{class r{constructor(){this.dataSource=new l.vpe}notify(c){this.dataSource.emit(c)}getNotice(){return this.dataSource}}return r.\u0275fac=function(c){return new(c||r)},r.\u0275prov=l.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},9497:(P,h,t)=>{t.r(h),t.d(h,{TabsPageModule:()=>g});var l=t(8779),v=t(9808),r=t(4182),u=t(1493),c=t(7942),e=t(2096);const s=[{path:"",component:c.D,children:[{path:"home",loadChildren:()=>Promise.all([t.e(8189),t.e(2670),t.e(6655),t.e(1507),t.e(8592),t.e(9623)]).then(t.bind(t,9623)).then(o=>o.HomePageModule)},{path:"",redirectTo:"home",pathMatch:"full"},{path:"insights",loadChildren:()=>Promise.all([t.e(8592),t.e(1239)]).then(t.bind(t,1239)).then(o=>o.InsightsPageModule)},{path:"settings",loadChildren:()=>t.e(8592).then(t.bind(t,6527)).then(o=>o.SettingsPageModule)},{path:"cards",loadChildren:()=>Promise.all([t.e(2670),t.e(2246)]).then(t.bind(t,2246)).then(o=>o.CardsPageModule)}]}];let f=(()=>{class o{}return o.\u0275fac=function(m){return new(m||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.Bz.forChild(s),u.Bz]}),o})(),g=(()=>{class o{}return o.\u0275fac=function(m){return new(m||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[l.Pc,v.ez,r.u5,f]}),o})()},7942:(P,h,t)=>{t.d(h,{D:()=>o});var l=t(655),v=t(9254),r=t(6276),u=t(5051),c=t(9689),e=t(2096),s=t(8779),f=t(9244),g=t(106);let o=(()=>{class d{constructor(n,a,i,T,y,C){this.actionSheetController=n,this.modalController=a,this.alertController=i,this.routerOutlet=T,this.dataService=y,this.eventService=C}selectAction(){return(0,l.mG)(this,void 0,void 0,function*(){yield(yield this.actionSheetController.create({header:"Type of transfer",cssClass:"custom-action-sheet",buttons:[{text:"PayPaddi Wallet",icon:"wallet",handler:()=>{this.sendToWallet()}},{text:"Bank Account",icon:"storefront",handler:()=>{this.sendToBank()}},{text:"CrossBorder",icon:"earth",handler:()=>{this.schedules()}},{text:"Cancel",icon:"close",role:"cancel"}]})).present()})}schedules(){return(0,l.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({header:"Alert",message:"Coming Soon!!!",buttons:["OK"]})).present()})}sendToWallet(){return(0,l.mG)(this,void 0,void 0,function*(){const n=this.dataService.getUserProfile();if(n.is_email_verify&&n.is_kyc1_verify){const a=yield this.modalController.create({component:r.X,swipeToClose:!1,presentingElement:this.routerOutlet.nativeEl});yield a.present();let{data:i}=yield a.onWillDismiss();i&&i.reload&&this.eventService.notify({reloadDashboard:!0})}else this.verifyNotice("kyc")})}verify(){return(0,l.mG)(this,void 0,void 0,function*(){yield(yield this.modalController.create({component:u.B,swipeToClose:!0,presentingElement:this.routerOutlet.nativeEl})).present()})}verifyNotice(n){return(0,l.mG)(this,void 0,void 0,function*(){const a=yield this.modalController.create({component:c.L,componentProps:{type:n},swipeToClose:!0,cssClass:"transfer-modal"});yield a.present();const{data:i}=yield a.onWillDismiss();i&&i.verify&&this.verify()})}sendToBank(){return(0,l.mG)(this,void 0,void 0,function*(){const n=this.dataService.getUserProfile();if(n.is_email_verify&&n.is_kyc1_verify){const a=yield this.modalController.create({component:v.d,swipeToClose:!1,presentingElement:this.routerOutlet.nativeEl});yield a.present();let{data:i}=yield a.onWillDismiss();i&&i.reload&&this.eventService.notify({reloadDashboard:!0})}else this.verifyNotice("kyc")})}}return d.\u0275fac=function(n){return new(n||d)(e.Y36(s.BX),e.Y36(s.IN),e.Y36(s.Br),e.Y36(s.jP),e.Y36(f.D),e.Y36(g.n))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-tabs"]],decls:22,vars:0,consts:[["slot","bottom"],["tab","home"],["name","home"],["tab","cards"],["name","card"],[1,"ion-tab-button-placeholder"],[3,"click"],["name","alarm-outline"],["tab","settings"],["name","apps-outline"],["vertical","bottom","horizontal","center","slot","fixed",1,"ion-fab-custom",3,"click"],["name","send",1,"send"]],template:function(n,a){1&n&&(e.TgZ(0,"ion-tabs")(1,"ion-tab-bar",0)(2,"ion-tab-button",1),e._UZ(3,"ion-icon",2),e.TgZ(4,"ion-label"),e._uU(5,"Home"),e.qZA()(),e.TgZ(6,"ion-tab-button",3),e._UZ(7,"ion-icon",4),e.TgZ(8,"ion-label"),e._uU(9,"Cards"),e.qZA()(),e._UZ(10,"ion-tab-button",5),e.TgZ(11,"ion-tab-button",6),e.NdJ("click",function(){return a.schedules()}),e._UZ(12,"ion-icon",7),e.TgZ(13,"ion-label"),e._uU(14,"Schedules"),e.qZA()(),e.TgZ(15,"ion-tab-button",8),e._UZ(16,"ion-icon",9),e.TgZ(17,"ion-label"),e._uU(18,"More"),e.qZA()()(),e.TgZ(19,"ion-fab",10),e.NdJ("click",function(){return a.selectAction()}),e.TgZ(20,"ion-fab-button"),e._UZ(21,"ion-icon",11),e.qZA()()())},dependencies:[s.IJ,s.W4,s.gu,s.Q$,s.yq,s.ZU,s.UN],styles:["ion-tab-bar[_ngcontent-%COMP%]{height:70px}.send[_ngcontent-%COMP%]{transform:rotate(-45deg);font-size:23px}"]}),d})()}}]);