import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private url = environment.baseUrl + '/admin/event/';

  constructor(private http?: HttpClient) { }

   create(data: any): any {
    return this.http.post(this.url, data);
   }

   update(data: any) {
    return this.http.post(this.url + 'update', data)
  }

   gets() {
      return this.http.get(this.url);
   }

   get(id: any) {
    return this.http.get(this.url + 'get/' + id)
  }
 
  delete(id: any) {
    return this.http.delete(this.url + id);
  }

  remove(id: any) {
    return this.http.delete(this.url + 'remove/' + id)
  }

}
