import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ClientService} from "../../services/client.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  queryForm: FormGroup;
  private currentQuery: string;
  private currentSort: string;
  private currentOrder: string;
  private currentName: string;
  private searchType: string = "name";
  private themes: string[] = ["name", "category"];

  themeForm: FormGroup = new FormGroup({
    theme: new FormControl('')
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private storageService: StorageService, private clientService: ClientService) {
  }

  ngOnInit() {
    this.queryForm = this.fb.group({
      query: new FormControl()
    });
    this.currentName = null;
    this.currentOrder = null;
    this.currentSort = null;
    this.currentQuery = null;

  }

  navigateToUrl(url) {
    this.router.navigateByUrl(url);
  }

  pickTheme() {
    this.searchType = this.themeForm.get('theme').value;
  }
}
