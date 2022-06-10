import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private url = environment.baseUrl;

  public user: any;
  public userLoggedIn  = false;
  public loggedinUserInfo: any;

  constructor(private http?: HttpClient) { }

   actorSignup(actor: any): any {
    return this.http.post(this.url + '/admin/actor', actor)
   }

   updateActorprofile(data: any) {
    return this.http.put(this.url + '/admin/actor', data)
   }

   getactor(id: any) {
    return this.http.get(this.url + '/admin/actor/detail/?id=' + id)
   }

   getactorByEmail(email: any) {
    return this.http.get(this.url + '/admin/actor/detail/?email=' + email)
   }

   getactors() {
    return this.http.get(this.url + '/admin/actor')
   }

   deleteactors(id: any) {
    return this.http.delete(this.url + '/admin/actor/' + id)
   }

   checkEmail(data: any) {
    return this.http.post(this.url + '/shared/Actor_Auth/checkEmail', data)
   }

   checkCode(data: any) {
    return this.http.post(this.url + '/shared/auth/verifay', data)
   }
 
   setNewpassword(data: any) {
    return this.http.post(this.url + '/shared/Actor_Auth/setPassword/', data)
  }


}
