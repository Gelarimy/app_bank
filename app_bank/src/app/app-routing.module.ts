import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {ClientComponent} from "./components/client/client.component";
import {LandingComponent} from "./components/landing/landing.component";
import {ClientslistComponent} from "./components/clientslist/clientslist.component";
import {DepositPlanListComponent} from "./components/plan-list/deposit-plan-list.component";
import {DepositComponent} from "./components/deposit/deposit.component";
import {CreditPlanListComponent} from "./components/creditlist/credit-plan-list.component";
import {CreditComponent} from "./components/credit/credit.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'client', component: ClientComponent},
  {path: 'list', component: ClientslistComponent},
  {path: 'deposit-plans', component: DepositPlanListComponent},
  {path: 'deposit', component: DepositComponent},
  {path: 'credit', component: CreditComponent},
  {path: 'credit-plans', component: CreditPlanListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
