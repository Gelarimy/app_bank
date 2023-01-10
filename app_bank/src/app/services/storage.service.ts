import {Injectable} from '@angular/core';
import {Client} from '../models/client';
import {Contract} from "../models/contract";
import {Plan} from "../models/plan";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private CLIENT_KEY = 'currentClient';
  private TOKEN_KEY = 'currentToken';
  private DEPOSIT_KEY = "currentDeposit";
  private PLAN_KEY = "currentPlan";

  constructor() {
  }

  set currentClient(client: Client) {
    localStorage.setItem(this.CLIENT_KEY, JSON.stringify(client));
  }

  get currentClient(): Client {
    if (localStorage.getItem(this.CLIENT_KEY) == null) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.CLIENT_KEY));
  }

  set currentToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  set currentDeposit(deposit: Contract) {
    localStorage.setItem(this.DEPOSIT_KEY, JSON.stringify(deposit));
  }

  get currentDeposit(): Contract {
    if (localStorage.getItem(this.DEPOSIT_KEY) == null) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.DEPOSIT_KEY));
  }

  set currentPlan(plan: Plan) {
    localStorage.setItem(this.PLAN_KEY, JSON.stringify(plan));
  }

  get currentPlan(): Plan {
    if (localStorage.getItem(this.PLAN_KEY) == null) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.PLAN_KEY));
  }

  get currentToken(): string {
    if (localStorage.getItem(this.TOKEN_KEY) == null) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
  }
}
