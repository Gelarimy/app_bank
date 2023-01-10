import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularTiltModule} from "angular-tilt";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClientComponent} from "./components/client/client.component";
import { LoginComponent } from './components/login/login.component';
import {JwtInterceptor} from "./services/interceptor.service";
import { SignupComponent } from './components/signup/signup.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientslistComponent } from './components/clientslist/clientslist.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { PlanListComponent } from './components/plan-list/plan-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    LandingComponent,
    NavbarComponent,
    ClientslistComponent,
    DepositComponent,
    PlanListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularTiltModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
    AngularTiltModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
