import {Component, OnInit} from '@angular/core';
import {Client} from "../../models/client";
import {StorageService} from "../../services/storage.service";
import {ClientService} from "../../services/client.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clientslist',
  templateUrl: './clientslist.component.html',
  styleUrls: ['./clientslist.component.css']
})
export class ClientslistComponent implements OnInit {
  public client: Client;
  public clientsList: Client[] = [];
  public selected: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private storageService: StorageService, private clientService: ClientService) {
  }


  ngOnInit() {
    if (this.clientService.isAuthenticated()) {
      this.clientService.getClientsList().subscribe(clients => {
        this.clientsList = clients;
        console.log(this.clientsList);
      });
    }
  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }
}
