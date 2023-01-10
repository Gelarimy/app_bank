import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated: boolean;
  isAdmin: boolean;
  timeout: any;

  constructor(private router: Router,
              private clientService: ClientService,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.timeout = setInterval( () => {
      this.authenticated = this.clientService.isAuthenticated();
      this.isAdmin = this.clientService.isAdmin();
    }, 1000);
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    if (this.clientService.isAuthenticated()) {
      this.clientService.logout();
      this.authenticated = false;
      this.navigateToUrl('/home');
    }
  }

  navigateToCurrentUser() {
    if (this.clientService.isAuthenticated()) {
      this.navigateToUrl('/client');
    }
  }
}
