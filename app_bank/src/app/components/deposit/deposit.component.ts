import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Contract} from "../../models/contract";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {DepositService} from "../../services/deposit.service";
import {Plan} from "../../models/plan";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  public currentPlan: Plan;
  public deposit: Contract;
  public depositCreationFailed: boolean;
  depositForm = new FormGroup({
    depositAmount: new FormControl('',
      [Validators.required,
        Validators.min(this.storageService.currentPlan.minimumDepositAmount), Validators.max(100000)])
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private storageService: StorageService, private depositService: DepositService) {
  }

  ngOnInit() {
    this.depositCreationFailed = false;
    this.currentPlan = this.storageService.currentPlan;
  }

  submit() {
    if (this.depositForm.valid) {
      this.deposit = new Contract();
      this.deposit.amount = this.depositForm.get('depositAmount').value;
      this.deposit.relatedClient = this.storageService.currentClient.id;
      this.deposit.termOfContract = this.storageService.currentPlan.period;
      this.deposit.planName = this.storageService.currentPlan.name;
      this.deposit.interest = this.storageService.currentPlan.interest;

      this.deposit.typeOfCurrency = this.storageService.currentPlan.typeOfCurrency;
      this.deposit.depositContract = true;
      this.deposit.creditContract = false;
      console.log(this.deposit);
      this.depositService.createDeposit(this.deposit).subscribe(
        response => {
          this.deposit = response.body;
          this.navigateToUrl('client');
        }, error => {
          this.depositCreationFailed = true;
        });
    }
  }

  get depositAmount() {
    return this.depositForm.get('depositAmount');
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }
}
