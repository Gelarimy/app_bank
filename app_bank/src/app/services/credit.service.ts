import {HttpClient, HttpResponse} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Client} from "../models/client";
import {City} from "../models/city";
import {Contract} from "../models/contract";
import {Plan} from "../models/plan";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  GET_CREDIT_PLANS_LIST = "/api/contracts/credits/plans";
  CREATE_CREDIT= "/api/contracts/credits/create";

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  getCreditPlans(): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(this.GET_CREDIT_PLANS_LIST);
  }

  createCredit(deposit: Contract): Observable<HttpResponse<Contract>> {
    return this.httpClient.post<any>(this.CREATE_CREDIT, deposit, {observe: 'response', responseType: 'json'});
  }
}
