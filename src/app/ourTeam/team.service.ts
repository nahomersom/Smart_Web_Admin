import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = environment.baseUrl + '/admin';
  public original_url = environment.baseUrl;

  public team: any;

  constructor(private http?: HttpClient) { }

   createteam(team: any): any {
    return this.http.post(this.url + '/team', team);
   }

   getteams() {
    return this.http.get(this.url + '/team');
   }

   getteam(id: any) {
    return this.http.get(this.url + '/team/detail/' + id)
   }

   updateteam(team: any) {
    return this.http.post(this.url + '/team/update', team)
  }

  deleteteam(data: any) {
    return this.http.post(this.url + '/team/delete',data)
  }
  removeteam(id: any) {
    return this.http.delete(this.url + '/team/remove/' + id)
  }

}
