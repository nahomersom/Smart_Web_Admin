import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private url = environment.baseUrl + '/admin';

  public setting: any;

  constructor(private http?: HttpClient) { }

   createsetting(setting: any): any {
    return this.http.post(this.url + '/setting', setting);
   }
   getsettings() {
    return this.http.get(this.url + '/setting');
   }

   updatesetting(setting: any) {
    return this.http.post(this.url + '/setting/update/' + setting.id, setting);
  }

}
