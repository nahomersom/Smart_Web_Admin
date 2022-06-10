import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url = environment.baseUrl + '/admin';
  public menu: any;

  constructor(private http?: HttpClient) { }

   createmenu(menu: any): any {
    return this.http.post(this.url + '/Menu', menu)
   }

   getmenus() {
    return this.http.get(this.url + '/Menu')
   }

   getParentmenus() {
    return this.http.get(this.url + '/Menu/getparentMenus')
   }

   getmenu(id: any) {
    return this.http.get(this.url + '/Menu/detail/' + id)
   }

   updatemenu(menu: any) {
    return this.http.post(this.url + '/Menu/update', menu);
  }

  deletemenu(id: any) {
    return this.http.delete(this.url + '/Menu/' + id)
  }

  removeMenu(id: any) {
    return this.http.delete(this.url + '/Menu/remove/' + id)
  }

}
