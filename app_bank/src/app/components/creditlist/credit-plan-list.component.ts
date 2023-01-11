import { Component, OnInit } from '@angular/core';
import {Plan} from "../../models/plan";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ClientService} from "../../services/client.service";
import {StorageService} from "../../services/storage.service";
import {DepositService} from "../../services/deposit.service";
import {CreditService} from "../../services/credit.service";

@Component({
  selector: 'app-creditlist',
  templateUrl: './credit-plan-list.component.html',
  styleUrls: ['./credit-plan-list.component.css']
})
export class CreditPlanListComponent implements OnInit {

  public plan: Plan;
  public creditPlans: Plan[] = [];
  public selected: string;
  constructor(private router: Router,
              private fb: FormBuilder, private clientService: ClientService,
              private storageService: StorageService, private creditService: CreditService) { }

  ngOnInit() {
    this.creditService.getCreditPlans().subscribe(plans => {
      this.creditPlans = plans;
      console.log(this.creditPlans);
    });
  }

  createCreditButton(plan: Plan) {
    if (!this.clientService.isAuthenticated()) {
      this.navigateToUrl("/login");
    } else {
      this.storageService.currentPlan = plan;
      this.navigateToUrl('credit');
    }
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }
}
