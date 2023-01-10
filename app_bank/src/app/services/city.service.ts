import {HttpClient, HttpResponse} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Client} from "../models/client";
import {City} from "../models/city";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  GET_CITIES_LIST = "/api/cities/list";

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  getCitiesList(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.GET_CITIES_LIST);
  }
}
