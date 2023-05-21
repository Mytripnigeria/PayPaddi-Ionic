"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6655],{6655:(N,m,c)=>{c.d(m,{P:()=>U});var r=c(655),p=c(3078),h=c(5216),e=c(2096),l=c(8779),v=c(8052);let y=(()=>{class o{constructor(t){this.req=t}getServicesByIdentifier(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosGet(`services/${t}`)})}getServicesByServiceID(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosGet(`service/variations/${t}`)})}verifyElectricity(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("electricity/verification",t)})}buyElectricity(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("buy/electricity",t)})}buyAirtime(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("buy/airtime",t)})}buyData(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("buy/data",t)})}verifyEducation(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("education/verification",t)})}buyEducation(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("buy/education",t)})}verifyTV(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("tv/verification",t)})}buyTV(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("buy/tv",t)})}getBetting(){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosGet("betting/billers/all")})}verifyBetting(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("betting/verification",t)})}buyBetting(t){return(0,r.mG)(this,void 0,void 0,function*(){return yield this.req.axiosPost("buy/betting",t)})}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(v.s))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var g=c(649),f=c(7913),_=c(9244),d=c(9808),b=c(9709),u=c(4182);function T(o,a){if(1&o&&(e.TgZ(0,"ion-avatar",13),e._UZ(1,"img",14),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.Q6J("src",null==t.service?null:t.service.image,e.LSH)}}function x(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-item",9),e.YNc(1,T,2,1,"ion-avatar",10),e.TgZ(2,"ion-label",11),e._uU(3,"Select Service"),e.qZA(),e.TgZ(4,"ion-input",12),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.chooseService())}),e.qZA()()}if(2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.service),e.xp6(3),e.Q6J("readonly",!0)("value","betting"!==t.type?null==t.service?null:t.service.name:t.service)}}function C(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-item",9)(1,"ion-label",11),e._uU(2,"Select Package"),e.qZA(),e.TgZ(3,"ion-input",12),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.chooseVariation())}),e.qZA()()}if(2&o){const t=e.oxw();e.xp6(3),e.Q6J("readonly",!0)("value",null==t.variation?null:t.variation.name)}}function A(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-item",9)(1,"ion-label",11),e._uU(2,"Amount(\u20a6)"),e.qZA(),e.TgZ(3,"ion-input",15),e.NdJ("ngModelChange",function(s){e.CHM(t);const n=e.oxw();return e.KtG(n.amount=s)})("keypress",function(s){e.CHM(t);const n=e.oxw();return e.KtG(n.keyPressNumbers(s))})("ngModelChange",function(s){e.CHM(t);const n=e.oxw();return e.KtG(n.amountChange(s))}),e.qZA()()}if(2&o){const t=e.oxw();e.xp6(3),e.Q6J("ngModel",t.amount)("readonly","education"==t.type)}}function P(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-item",9)(1,"ion-label",11),e._uU(2,"Amount(\u20a6)"),e.qZA(),e.TgZ(3,"ion-input",16),e.NdJ("ngModelChange",function(s){e.CHM(t);const n=e.oxw();return e.KtG(n.amount=s)}),e.qZA()()}if(2&o){const t=e.oxw();e.xp6(3),e.Q6J("ngModel",t.amount)}}function S(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-button",19),e.NdJ("click",function(){e.CHM(t);const s=e.oxw(2);return e.KtG(s.veriyBill())}),e._uU(1," Verify "),e.qZA()}if(2&o){const t=e.oxw(2);e.Q6J("disabled",t.verifying)}}function Z(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-item",9)(1,"ion-label",11),e._uU(2,"Number"),e.qZA(),e.TgZ(3,"ion-input",17),e.NdJ("ngModelChange",function(s){e.CHM(t);const n=e.oxw();return e.KtG(n.billersCode=s)})("ngModelChange",function(s){e.CHM(t);const n=e.oxw();return e.KtG(n.phoneNumChange(s))}),e.qZA(),e.YNc(4,S,2,1,"ion-button",18),e.qZA()}if(2&o){const t=e.oxw();e.xp6(3),e.Q6J("ngModel",t.billersCode),e.xp6(1),e.Q6J("ngIf","cable"==t.type||"power"==t.type||"betting"==t.type||"education"==t.type&&"jamb"==t.service.serviceID)}}function B(o,a){if(1&o&&(e.TgZ(0,"ion-item",9)(1,"ion-label",11),e._uU(2,"Customer Address"),e.qZA(),e._UZ(3,"ion-input",20),e.qZA()),2&o){const t=e.oxw();e.xp6(3),e.Q6J("readonly",!0)("value",t.verificationData.Address)}}function E(o,a){if(1&o&&(e.TgZ(0,"ion-item",9)(1,"ion-label",11),e._uU(2,"Customer Name"),e.qZA(),e._UZ(3,"ion-input",20),e.qZA()),2&o){const t=e.oxw();e.xp6(3),e.Q6J("readonly",!0)("value",t.verificationData.name)}}function G(o,a){if(1&o&&(e.TgZ(0,"ion-item",9)(1,"ion-label",11),e._uU(2,"Customer Name"),e.qZA(),e._UZ(3,"ion-input",20),e.qZA()),2&o){const t=e.oxw();e.xp6(3),e.Q6J("readonly",!0)("value",t.verificationData.Customer_Name)}}function D(o,a){if(1&o&&(e.TgZ(0,"ul",9)(1,"li"),e._uU(2),e.ALo(3,"currency"),e.qZA(),e.TgZ(4,"li"),e._uU(5),e.ALo(6,"currency"),e.qZA()()),2&o){const t=e.oxw();e.xp6(2),e.hij("Fee - \u20a6",e.lcZ(3,2,t.getCurrentFee()||0),""),e.xp6(3),e.hij("Total - \u20a6",e.lcZ(6,4,t.getTotalAmount()||0),"")}}function I(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-button",21),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.confirmTransfer())}),e.TgZ(1,"span"),e._uU(2,"Purchase"),e.qZA()()}if(2&o){const t=e.oxw();e.Q6J("disabled",!t.amount||t.amount<1||!t.billersCode||t.billersCode<4||!t.verifiable())}}function J(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"ion-button",21),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.confirmTransfer())}),e.TgZ(1,"span"),e._uU(2,"Purchase"),e.qZA()()}if(2&o){const t=e.oxw();e.Q6J("disabled",!t.amount||t.amount<1||!t.billersCode||t.billersCode.length<11)}}let U=(()=>{class o{constructor(t,i,s,n,F,w,M,q){this.navParam=t,this.bill=i,this.modalController=s,this.toastService=n,this.util=F,this.dataService=w,this.currencyPipe=M,this.userService=q,this.type=null,this.verifying=!1,this.variation=null,this.identifier=null,this.fees=null,this.service=null,this.amount=null,this.amountHolder=null,this.billersCode=null,this.verificationData=null,this.variations=[],this.services=[]}ngOnInit(){this.type=this.navParam.data.type,this.identifier=this.navParam.data.identifier,this.getServices(),this.getFees()}getTotalAmount(){return"power"==this.type?parseFloat(this.amountHolder)+parseFloat(this.fees.electricity):parseFloat(this.amountHolder)+parseFloat(this.fees[this.type])}getCurrentFee(){return"power"==this.type?this.fees.electricity:this.fees[this.type]}getServices(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Getting Services");t.present();let i=null;"betting"!==this.type?i=yield this.bill.getServicesByIdentifier(this.identifier):(i=yield this.bill.getBetting(),console.log(i)),i.result?i.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger",i.result.data.message,2e3)):(console.log(i),this.services=i.result.data.data,t.dismiss()):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}getFees(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.userService.getUserFees();console.log(t),t.result&&(this.fees=t.result.data)})}getVariations(t,i=!0){return(0,r.mG)(this,void 0,void 0,function*(){const s=yield this.util.loader("Getting Packages");i&&s.present();const n=yield this.bill.getServicesByServiceID(t);i&&s.dismiss(),n.result?n.result.data.error?this.toastService.presentToast("Error","top","danger",n.result.data.message,2e3):(console.log(n),this.variations=n.result.data.data.varations,console.log("variationss",this.variations),this.variations&&(console.log("variationss",this.variations,this.type),this.variation=this.variations[0],this.amount=this.variations[0].variation_amount,this.amount=this.currencyPipe.transform(this.amount,"","","0.0-0"),this.amountHolder=parseFloat(this.amount.replace(/,/g,"")))):this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)})}cancel(){this.modalController.dismiss()}chooseService(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.modalController.create({component:p.F,swipeToClose:!0,componentProps:{services:this.services,type:"services",exception:"betting"==this.type?"betting":null},cssClass:"transfer-modal"});yield t.present();const{data:i}=yield t.onDidDismiss();console.log(i),i&&i.service&&(this.verificationData=null,this.billersCode=null,this.service=i.service,"airtime"!==this.type&&"betting"!==this.type&&this.getVariations(i.service.serviceID))})}chooseVariation(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.modalController.create({component:p.F,swipeToClose:!0,componentProps:{variations:this.variations,type:"variations"},cssClass:"transfer-modal"});yield t.present();const{data:i}=yield t.onDidDismiss();i&&i.variation&&(this.variation=i.variation,this.amount=i.variation.variation_amount,this.amount=this.currencyPipe.transform(this.amount,"","","0.0-0"),this.amountHolder=parseFloat(this.amount.replace(/,/g,"")),console.log("deb==>",this.amount))})}confirmTransfer(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.modalController.create({component:h.V,swipeToClose:!1,cssClass:"transfer-modal"});yield t.present();let{data:i}=yield t.onWillDismiss();i.success?(console.log(i),this.buyBill()):console.log("wrong")})}keyPressNumbers(t){console.log(t.which),console.log(t.keyCode);const i=t.which?t.which:t.keyCode;return!(i<48||i>57)||(t.preventDefault(),!1)}amountChange(t){if(console.log("the ev===>",t),""==t)return this.amountHolder=null;t=t.replace(/,/g,""),this.amount=this.currencyPipe.transform(t,"","","0.0-0"),this.amountHolder=parseFloat(this.amount.replace(/,/g,"")),console.log(parseFloat(this.amountHolder))}buyAirtime(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("purchasing");t.present(),console.log(this.service),console.log(this.variation);const i={amount:`${parseFloat(this.amount.replace(/,/g,""))}`,phone:this.billersCode,service_id:this.service.serviceID},s=yield this.bill.buyAirtime(i);t.dismiss(),s.result?s.result.data.error?this.toastService.presentToast("Error","top","danger",s.result.data.message,2e3):(this.toastService.presentToast("Success","top","success",s.result.data.message,2e3),this.modalController.dismiss({reload:!0})):this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)})}buyData(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Purchasing");t.present(),console.log(this.service),console.log(this.variation);const i={amount:`${parseFloat(this.amount.replace(/,/g,""))}`,phone:this.billersCode,service_id:this.service.serviceID,variation_code:this.variation.variation_code},s=yield this.bill.buyData(i);t.dismiss(),s.result?s.result.data.error?this.toastService.presentToast("Error","top","danger",s.result.data.message,2e3):(this.toastService.presentToast("Success","top","success",s.result.data.message,2e3),this.modalController.dismiss({reload:!0})):this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)})}verifyEducation(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Verifying");t.present();const i={billers_code:this.billersCode,service_id:this.service.serviceID},s=yield this.bill.verifyEducation(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)):this.verificationData=s.result.data.data):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}verifyElectricity(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Verifying");t.present();const i={billers_code:this.billersCode,service_id:this.service.serviceID,type:this.variation.variation_code,amount:`${parseFloat(this.amount.replace(/,/g,""))}`,phone:this.dataService.userProfile.phone},s=yield this.bill.verifyElectricity(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger",s.result.data.data,4e3)):(console.log("from VErification",s),this.verificationData=s.result.data.data)):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}verifyCable(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Verifying");t.present();const i={billers_code:this.billersCode,service_id:this.service.serviceID},s=yield this.bill.verifyTV(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger",s.result.data.data,4e3)):this.verificationData=s.result.data.data):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}verifyBetting(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Verifying");t.present();const i={biller:this.service,better_id:this.billersCode},s=yield this.bill.verifyBetting(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger",s.result.data.data,4e3)):this.verificationData=s.result.data.data):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}buyEducation(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Purchasing");t.present();const i={service_id:this.service.serviceID,variation_code:this.variation.variation_code,amount:`${parseFloat(this.amount.replace(/,/g,""))}`,phone:this.dataService.userProfile.phone,billers_code:this.billersCode},s=yield this.bill.buyEducation(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)):(this.toastService.presentToast("Success","top","success",s.result.data.message,2e3),this.modalController.dismiss({reload:!0}))):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}buyElectricity(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Purchasing");t.present();const i={billers_code:this.billersCode,service_id:this.service.serviceID,type:this.variation.variation_code,amount:`${parseFloat(this.amount.replace(/,/g,""))}`,phone:this.dataService.userProfile.phone},s=yield this.bill.buyElectricity(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)):(this.toastService.presentToast("Success","top","success",s.result.data.message,2e3),this.modalController.dismiss({reload:!0}))):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}buyCable(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Purchasing");t.present();const i={billers_code:this.billersCode,service_id:this.service.serviceID,variation_code:this.variation.variation_code,amount:`${parseFloat(this.amount.replace(/,/g,""))}`,phone:this.dataService.userProfile.phone},s=yield this.bill.buyTV(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)):(this.toastService.presentToast("Success","top","success",s.result.data.message,2e3),this.modalController.dismiss({reload:!0}))):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}buyBetting(){return(0,r.mG)(this,void 0,void 0,function*(){const t=yield this.util.loader("Purchasing");t.present();const i={biller:this.service,better_id:this.billersCode,amount:parseFloat(this.amount.replace(/,/g,""))},s=yield this.bill.buyBetting(i);s.result?(t.dismiss(),s.result.data.error?(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3)):(this.toastService.presentToast("Success","top","success",s.result.data.message,2e3),this.modalController.dismiss({reload:!0}))):(t.dismiss(),this.toastService.presentToast("Error","top","danger","Unable to complete transaction",4e3))})}buyBill(){"airtime"==this.type&&this.buyAirtime(),"data"==this.type&&this.buyData(),"education"==this.type&&this.buyEducation(),"power"==this.type&&this.buyElectricity(),"cable"==this.type&&this.buyCable(),"betting"==this.type&&this.buyBetting()}veriyBill(){"power"==this.type&&this.verifyElectricity(),"education"==this.type&&this.verifyEducation(),"cable"==this.type&&this.verifyCable(),"betting"==this.type&&this.verifyBetting()}verifiable(){return"cable"!=this.type&&"power"!=this.type&&"betting"!=this.type&&("education"!=this.type||"jamb"!=this.service.serviceID)||!!this.verificationData}phoneNumChange(t){this.verificationData=null}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(l.X1),e.Y36(y),e.Y36(l.IN),e.Y36(g.k),e.Y36(f.t),e.Y36(_.D),e.Y36(d.H9),e.Y36(b.K))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-buy-airtime"]],decls:24,vars:12,consts:[["slot","start"],[3,"click"],[1,"ion-padding"],[1,"form-default"],["lines","none",1,"item-card-list"],["class","animate__animated animate__fadeIn",4,"ngIf"],["collapse","fade",1,"modal-footer"],["color","secondary"],["type","submit","expand","block","color","primary",3,"disabled","click",4,"ngIf"],[1,"animate__animated","animate__fadeIn"],["slot","start","style","margin-top: 20px",4,"ngIf"],["color","tertiary","position","stacked"],["type","text",3,"readonly","value","click"],["slot","start",2,"margin-top","20px"],[3,"src"],["type","tel","pattern","^[1-9][0-9]*$",3,"ngModel","readonly","ngModelChange","keypress"],["readonly","true","type","tel",3,"ngModel","ngModelChange"],["type","tel",3,"ngModel","ngModelChange"],["slot","end","class","verify ios button button-small button-solid ion-activatable ion-focusable hydrated",3,"disabled","click",4,"ngIf"],["slot","end",1,"verify","ios","button","button-small","button-solid","ion-activatable","ion-focusable","hydrated",3,"disabled","click"],["type","text",3,"readonly","value"],["type","submit","expand","block","color","primary",3,"disabled","click"]],template:function(t,i){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0)(3,"ion-button",1),e.NdJ("click",function(){return i.cancel()}),e._uU(4," Cancel "),e.qZA()(),e.TgZ(5,"ion-title"),e._uU(6),e.qZA()()(),e.TgZ(7,"ion-content",2)(8,"div",3)(9,"ion-list",4),e.YNc(10,x,5,3,"ion-item",5),e.YNc(11,C,4,2,"ion-item",5),e.YNc(12,A,4,2,"ion-item",5),e.YNc(13,P,4,1,"ion-item",5),e.YNc(14,Z,5,2,"ion-item",5),e.YNc(15,B,4,2,"ion-item",5),e.YNc(16,E,4,2,"ion-item",5),e.YNc(17,G,4,2,"ion-item",5),e.YNc(18,D,7,6,"ul",5),e.qZA()()(),e.TgZ(19,"ion-footer",6)(20,"ion-toolbar",7)(21,"form",3),e.YNc(22,I,3,1,"ion-button",8),e.YNc(23,J,3,1,"ion-button",8),e.qZA()()()),2&t&&(e.xp6(6),e.hij("Buy ",i.type,""),e.xp6(4),e.Q6J("ngIf",i.services),e.xp6(1),e.Q6J("ngIf",i.service&&i.variations.length>0),e.xp6(1),e.Q6J("ngIf",i.services&&"data"!==i.type),e.xp6(1),e.Q6J("ngIf",i.services&&"data"==i.type),e.xp6(1),e.Q6J("ngIf",i.amountHolder&&i.amountHolder>0),e.xp6(1),e.Q6J("ngIf",i.verificationData&&"power"==i.type),e.xp6(1),e.Q6J("ngIf",i.verificationData&&"betting"==i.type),e.xp6(1),e.Q6J("ngIf",i.verificationData&&("cable"==i.type||"power"==i.type||"education"==i.type)),e.xp6(1),e.Q6J("ngIf",i.amountHolder),e.xp6(4),e.Q6J("ngIf","airtime"!==i.type&&"data"!==i.type),e.xp6(1),e.Q6J("ngIf","airtime"==i.type||"data"==i.type))},dependencies:[d.O5,u._Y,u.JJ,u.JL,u.c5,u.On,u.F,l.BJ,l.YG,l.Sm,l.W2,l.fr,l.Gu,l.pK,l.Ie,l.Q$,l.q_,l.wd,l.sr,l.j9,d.H9],styles:["ion-button.verify[_ngcontent-%COMP%]{margin-top:25px}ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{font-size:14px}"]}),o})()}}]);