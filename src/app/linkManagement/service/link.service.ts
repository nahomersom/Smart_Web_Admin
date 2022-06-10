import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private url = environment.baseUrl + '/admin';

  public link: any;

  constructor(private http?: HttpClient) { }

   createlink(link: any): any {
    return this.http.post(this.url + '/link', link);
   }

   getlinks() {
      return this.http.get(this.url + '/link');
   }
   getlink(id: any) {
    return this.http.get(this.url + '/link/detail/' + id)
  }
   updatelink(link: any) {
    return this.http.post(this.url + '/link/update', link)
  }

  deletelink(id: any) {
    return this.http.delete(this.url + '/link/' + id);
  }

  removelink(id: any) {
    return this.http.delete(this.url + '/link/remove/' + id)
  }
}
