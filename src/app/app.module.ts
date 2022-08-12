import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import {HttpClientModule} from '@angular/common/http';

import {Drivers} from '@ionic/storage';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ScreenOrientation, Camera, SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
