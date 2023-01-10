import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Contract} from "../../models/contract";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: Client;
  clientContracts: Contract[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    username: new FormControl('')
  });
  constructor(private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private httpClient: HttpClient,
    private clientService: ClientService) { }

  ngOnInit() {
    this.client = this.storageService.currentClient;
    this.clientService.getClientContracts(this.client.id).subscribe( response => {
        this.clientContracts = response;
        console.log(this.clientContracts);
    })
  }

  redirect(url: string) {
    this.router.navigateByUrl(url);
  }

  get name() {
    return this.form.get('name');
  }

  get surname() {
    return this.form.get('surname');
  }

  get username() {
    return this.form.get('username');
  }

  get secondName() {
    return this.form.get('secondName');
  }

  get birthdayDate() {
    return this.form.get('birthdayDate');
  }

  get passportNumber() {
    return this.form.get('passportNumber');
  }

  get issuedBy() {
    return this.form.get('issuedBy');
  }

  get dateOfIssue() {
    return this.form.get('dateOfIssue');
  }

  get passportId() {
    return this.form.get('passportId');
  }

  get placeOfBirthday() {
    return this.form.get('placeOfBirthday');
  }

  get placeOfResidence() {
    return this.form.get('name');
  }

  get address() {
    return this.form.get('address');
  }

  get mobilePhoneNumber() {
    return this.form.get('mobilePhoneNumber');
  }

  get homePhoneNumber() {
    return this.form.get('homePhoneNumber');
  }

  get email() {
    return this.form.get('email');
  }

  get placeOfWork() {
    return this.form.get('placeOfWork');
  }

  get position() {
    return this.form.get('position');
  }
  get maritalStatus() {
    return this.form.get('maritalStatus');
  }

  get citizenship() {
    return this.form.get('citizenship');
  }

  get disability() {
    return this.form.get('disability');
  }

  get pensioner() {
    return this.form.get('pensioner');
  }

  get monthlyIncome() {
    return this.form.get('monthlyIncome');
  }

  get password() {
    return this.form.get('password');
  }

  get liableForMilitary() {
    return this.form.get('liableForMilitary');
  }


  submit() {
    if (this.form.valid) {
      this.client.name = this.name.value;
      this.client.surname = this.surname.value;
      this.updateClient();
    }
  }

  updateClient() {
    this.clientService.updateClient(this.client).subscribe(data => {
      this.redirect('/client' + this.client.id);
    });
  }
}

