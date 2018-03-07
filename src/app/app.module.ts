import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LandingModule } from './landing/landing.module';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';
import { StatisticsModule } from './statistics/statistics.module';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    LoginModule,
    LandingModule,
    MainModule,
    StatisticsModule,
    AppRoutingModule
  ],
  providers: [ AngularFirestore ],
  bootstrap: [AppComponent]
})
export class AppModule { }
