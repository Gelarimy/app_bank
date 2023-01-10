import { Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {StorageService} from "../../services/storage.service";
import {Client} from "../../models/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  client: Client = new Client();
  loginFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });
  incorrectLogin: boolean;


  constructor(private elementRef: ElementRef,
              private router: Router,
              private clientService: ClientService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.incorrectLogin = false;
  }

  onLoginSubmit() {
    this.login();
  }

  login(): void {
    this.client = new Client();
    this.client.password = this.loginFormGroup.get('password').value;
    this.client.username = this.loginFormGroup.get('username').value;
    this.clientService.login(this.client).subscribe(
      resp => {
        this.client = resp.body;
        this.storageService.currentToken = resp.headers.get('X-Auth-Token');
        this.storageService.currentClient = this.client;
        this.navigateToUrl('home');
      }, error => {
        this.incorrectLogin = true;
      }
    )
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

  closeAlert() {
    this.incorrectLogin = false;
  }

}
