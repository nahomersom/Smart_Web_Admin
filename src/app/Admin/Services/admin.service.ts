import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = environment.baseUrl + '/shared/Actor_Auth';
  public user: any;

  constructor(private http?: HttpClient) { }

   loginAuth(data: any) {
    return this.http.post(this.url + '/login', data)
  }
  
   updateprofile(data: any) {
    return this.http.post(this.url + '/updateProfile', data)
  }

}  
 
