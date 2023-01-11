import {HttpClient, HttpResponse} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Injectable} from "@angular/core";
import {Client} from "../models/client";
import {Observable} from "rxjs";
import {Contract} from "../models/contract";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  LOGIN_URL = '/api/login';
  REGISTRATION_URL = '/api/register';
  GET_CLIENT_BY_ID_URL = '/api/clients/';
  GET_CLIENTS_LIST = "/api/clients/list";
  GET_CLIENT_CONTRACTS = "/api/clients"

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  logout() {
    this.storageService.currentClient = null;
    this.storageService.currentToken = null;
  }

  isAuthenticated(): boolean {
    return this.storageService.currentClient != null && this.storageService.currentToken != null;
  }

  isAdmin(): boolean {
    return this.storageService.currentClient.role == 'admin';
  }

  login(user: Client): Observable<HttpResponse<Client>> {
    return this.httpClient.post<any>(this.LOGIN_URL, user, {observe: 'response', responseType: 'json'})
  }

  register(user: Client): Observable<HttpResponse<Client>> {
    return this.httpClient.post<any>(this.REGISTRATION_URL, user, {observe: 'response', responseType: 'json'})
  }

  getUser(clientId: string): Observable<any> {
    return this.httpClient.get(this.GET_CLIENT_BY_ID_URL + clientId);
  }

  updateClient(client: Client) {
    return this.httpClient.post(this.GET_CLIENT_BY_ID_URL + client.id + '/update', client);
  }

  getClientsList(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.GET_CLIENTS_LIST);
  }

  getClientDepositContracts(id: string): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.GET_CLIENT_CONTRACTS + '/' + id + '/deposits');
  }

  getClientCreditContracts(id: string): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.GET_CLIENT_CONTRACTS + '/' + id + '/credits');
  }
}
