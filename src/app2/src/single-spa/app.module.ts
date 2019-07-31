import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData, APP_BASE_HREF } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { EmptyRouteComponent } from '../app/empty-route/empty-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, EmptyRouteComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/app2/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
