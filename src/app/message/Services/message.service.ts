import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = environment.baseUrl + '/admin';

  public message: any;

  constructor(private http?: HttpClient) { }
   getMessages() {
    return this.http.get(this.url + '/message');
   }
   getMessage(id: any) {
    return this.http.get(this.url + '/message/' + id);
   }
   deleteMessage(id: any) {
    return this.http.delete(this.url + '/message/' + id);
  }

}
