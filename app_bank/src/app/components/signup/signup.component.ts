import {AfterViewChecked, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {StorageService} from "../../services/storage.service";
import {Client} from "../../models/client";
import {FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {City} from "../../models/city";
import {CityService} from "../../services/city.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  client: Client = new Client();
  pensioner: false;
  liableForMilitary: false;
  public citiesList: City[] = [];
  registrationFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    surname: new FormControl('', [
      Validators.required
    ]),
    secondName: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    birthdayDate: new FormControl('', [
      Validators.required
    ]),
    passportNumber: new FormControl('', [
      Validators.required
    ]),
    issuedBy: new FormControl('', [
      Validators.required
    ]),
    dateOfIssue: new FormControl('', [
      Validators.required
    ]),
    passportId: new FormControl('', [
      Validators.required
    ]),
    placeOfBirthday: new FormControl('', [
      Validators.required
    ]),
    placeOfResidence: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    mobilePhoneNumber: new FormControl('', [
    ]),
    homePhoneNumber: new FormControl('', [
    ]),
    email: new FormControl('', [
      Validators.email
    ]),
    placeOfWork: new FormControl('', [
    ]),
    position: new FormControl('', [
    ]),
    maritalStatus: new FormControl('', [
      Validators.required
    ]),
    citizenship: new FormControl('', [
      Validators.required
    ]),
    disability: new FormControl('', [
      Validators.required
    ]),
    monthlyIncome: new FormControl('', [
      Validators.required
    ])
  });
  registrationFailed: boolean;

  constructor(private elementRef: ElementRef,
              private router: Router,
              private clientService: ClientService,
              private storageService: StorageService,
              private cityService: CityService) {
  }

  ngOnInit() {
    this. pensioner = false;
    this.liableForMilitary = false;
    this.registrationFailed = false;
     this.cityService.getCitiesList().subscribe(cities => {
       this.citiesList = cities;
     });
  }

  onRegistrationSubmit() {
    this.register();
  }


  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

  register(): void {
    this.client = new Client();
    this.client.name = this.registrationFormGroup.get('name').value;
    this.client.password = this.registrationFormGroup.get('password').value;
    this.client.surname = this.registrationFormGroup.get('surname').value;
    this.client.secondName = this.registrationFormGroup.get('secondName').value;
    this.client.birthdayDate = this.registrationFormGroup.get('birthdayDate').value;
    this.client.passportNumber = this.registrationFormGroup.get('passportNumber').value;
    this.client.issuedBy = this.registrationFormGroup.get('issuedBy').value;
    this.client.dateOfIssue = this.registrationFormGroup.get('dateOfIssue').value;
    this.client.passportId = this.registrationFormGroup.get('passportId').value;
    this.client.username = this.registrationFormGroup.get('passportNumber').value;
    this.client.placeOfBirthday = this.registrationFormGroup.get('placeOfBirthday').value;
    this.client.placeOfResidence = this.registrationFormGroup.get('placeOfResidence').value;
    this.client.address = this.registrationFormGroup.get('address').value;
    this.client.mobilePhoneNumber = this.registrationFormGroup.get('mobilePhoneNumber').value;
    this.client.homePhoneNumber = this.registrationFormGroup.get('homePhoneNumber').value;
    this.client.email = this.registrationFormGroup.get('email').value;
    this.client.placeOfWork = this.registrationFormGroup.get('placeOfWork').value;
    this.client.position = this.registrationFormGroup.get('position').value;
    this.client.maritalStatus = this.registrationFormGroup.get('maritalStatus').value;
    this.client.citizenship = this.registrationFormGroup.get('citizenship').value;
    this.client.disability = this.registrationFormGroup.get('disability').value;
    this.client.monthlyIncome = this.registrationFormGroup.get('monthlyIncome').value;
    this.client.pensioner = this.pensioner;
    this.client.liableForMilitary = this.liableForMilitary;
    console.log(this.client.pensioner);
    console.log(this.client.liableForMilitary);
    this.clientService.register(this.client).subscribe(
      resp => {
        this.client = resp.body;
        this.storageService.currentToken = resp.headers.get('X-Auth-Token');
        this.storageService.currentClient = this.client;
        this.navigateToUrl('home');
      }, error => {
        this.registrationFailed = true;
      }
    )
  }

  get name() {
    return this.registrationFormGroup.get('name');
  }

  get surname() {
    return this.registrationFormGroup.get('surname');
  }

  get secondName() {
    return this.registrationFormGroup.get('secondName');
  }

  get birthdayDate() {
    return this.registrationFormGroup.get('birthdayDate');
  }

  get passportNumber() {
    return this.registrationFormGroup.get('passportNumber');
  }

  get issuedBy() {
    return this.registrationFormGroup.get('issuedBy');
  }

  get dateOfIssue() {
    return this.registrationFormGroup.get('dateOfIssue');
  }

  get passportId() {
    return this.registrationFormGroup.get('passportId');
  }

  get placeOfBirthday() {
    return this.registrationFormGroup.get('placeOfBirthday');
  }

  get placeOfResidence() {
    return this.registrationFormGroup.get('placeOfResidence');
  }

  get address() {
    return this.registrationFormGroup.get('address');
  }

  get email(){
    return this.registrationFormGroup.get('email');
  }

  get maritalStatus() {
    return this.registrationFormGroup.get('maritalStatus');
  }

  get citizenship() {
    return this.registrationFormGroup.get('citizenship');
  }

  get disability() {
    return this.registrationFormGroup.get('disability');
  }

  get monthlyIncome() {
    return this.registrationFormGroup.get('monthlyIncome');
  }

  get password() {
    return this.registrationFormGroup.get('password');
  }
}
