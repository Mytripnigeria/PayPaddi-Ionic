"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6874],{6874:(i,o,e)=>{e.r(o),e.d(o,{Browser:()=>a,BrowserWeb:()=>r});var l=e(5861),t=e(7423);class r extends t.Uw{constructor(){super(),this._lastWindow=null}open(s){var n=this;return(0,l.Z)(function*(){n._lastWindow=window.open(s.url,s.windowName||"_blank")})()}close(){var s=this;return(0,l.Z)(function*(){return new Promise((n,_)=>{null!=s._lastWindow?(s._lastWindow.close(),s._lastWindow=null,n()):_("No active window to close!")})})()}}const a=new r}}]);