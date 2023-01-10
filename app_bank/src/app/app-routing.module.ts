import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {ClientComponent} from "./components/client/client.component";
import {LandingComponent} from "./components/landing/landing.component";
import {ClientslistComponent} from "./components/clientslist/clientslist.component";
import {PlanListComponent} from "./components/plan-list/plan-list.component";
import {DepositComponent} from "./components/deposit/deposit.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'client', component: ClientComponent},
  {path: 'list', component: ClientslistComponent},
  {path: 'plans', component: PlanListComponent},
  {path: 'deposit', component: DepositComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
