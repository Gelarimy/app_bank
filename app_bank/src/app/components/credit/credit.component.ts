import {Component, OnInit} from '@angular/core';
import {Plan} from "../../models/plan";
import {Contract} from "../../models/contract";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {CreditService} from "../../services/credit.service";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  public currentPlan: Plan;
  public credit: Contract;
  public depositCreationFailed: boolean;
  creditForm = new FormGroup({
    creditAmount: new FormControl('', [
      Validators.required,
      Validators.max(this.storageService.currentPlan.maximumCreditAmount),
      Validators.min(100)]),
    creditPeriod: new FormControl('', [
      Validators.required,
      Validators.max(this.storageService.currentPlan.period),
      Validators.min(1)]
    )
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private storageService: StorageService, private creditService: CreditService) {
  }

  ngOnInit() {
    this.depositCreationFailed = false;
    this.currentPlan = this.storageService.currentPlan;
  }

  submit() {
    if (this.creditForm.valid) {
      this.credit = new Contract();
      this.credit.amount = this.creditForm.get('creditAmount').value;
      this.credit.relatedClient = this.storageService.currentClient.id;
      this.credit.termOfContract = this.creditForm.get('creditPeriod').value;
      this.credit.planName = this.storageService.currentPlan.name;
      this.credit.interest = this.storageService.currentPlan.interest;

      this.credit.typeOfCurrency = this.storageService.currentPlan.typeOfCurrency;
      this.credit.depositContract = false;
      this.credit.creditContract = true;
      console.log(this.credit);
      this.creditService.createCredit(this.credit).subscribe(
        response => {
          this.credit = response.body;
          this.navigateToUrl('client');
        }, error => {
          this.depositCreationFailed = true;
        });
    }
  }

  get creditAmount() {
    return this.creditForm.get('creditAmount');
  }

  get creditPeriod() {
    return this.creditForm.get('creditPeriod');
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

}
