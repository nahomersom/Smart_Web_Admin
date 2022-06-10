import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private url = environment.baseUrl + '/admin';
  public original_url = environment.baseUrl + '/';

  public member: any;

  constructor(private http?: HttpClient) { }

   getmembers() {
    return this.http.get(this.url + '/member');
   }

   getmember(id: any) {
    return this.http.get(this.url + '/member/detail/' + id)
   }

   updatemember(member: any) {
    return this.http.put(this.url + '/member', member);
  }

  activatemember(member: any) {
    return this.http.put(this.url + '/member', member);
  }

}
