import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private url = environment.baseUrl + '/admin';

  public subscription: any;

  constructor(private http?: HttpClient) { }

   createSubscription(subscription: any): any {
    return this.http.post(this.url + '/subscription', subscription);
   }

   getSubscriptions() {
      return this.http.get(this.url + '/subscription');
   }

  deleteSubscription(id: any) {
    return this.http.delete(this.url + '/subscription/' + id);
  }
}
