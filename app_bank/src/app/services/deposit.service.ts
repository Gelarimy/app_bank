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
export class DepositService {

  GET_DEPOSIT_PLANS_LIST = "/api/contracts/plans";
  CREATE_DEPOSIT = "/api/contracts/create";

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  getDepositPlans(): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(this.GET_DEPOSIT_PLANS_LIST);
  }

  createDeposit(deposit: Contract): Observable<HttpResponse<Contract>> {
    return this.httpClient.post<any>(this.CREATE_DEPOSIT, deposit, {observe: 'response', responseType: 'json'});
  }
}
