import { Component, OnInit } from '@angular/core';
import {Plan} from "../../models/plan";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {StorageService} from "../../services/storage.service";
import {ClientService} from "../../services/client.service";
import {DepositService} from "../../services/deposit.service";

@Component({
  selector: 'app-plan-list',
  templateUrl: './deposit-plan-list.component.html',
  styleUrls: ['./deposit-plan-list.component.css']
})
export class DepositPlanListComponent implements OnInit {
  public plan: Plan;
  public depositPlans: Plan[] = [];
  public selected: string;
  constructor(private router: Router,
              private fb: FormBuilder, private clientService: ClientService,
              private storageService: StorageService, private depositService: DepositService) { }

  ngOnInit() {
    this.depositService.getDepositPlans().subscribe(plans => {
      this.depositPlans = plans;
      console.log(this.depositPlans);
    });
  }

  createDepositButton(plan: Plan) {
    if (!this.clientService.isAuthenticated()) {
      this.navigateToUrl("/login");
    } else {
      this.storageService.currentPlan = plan;
      this.navigateToUrl('deposit');
    }
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }
}
