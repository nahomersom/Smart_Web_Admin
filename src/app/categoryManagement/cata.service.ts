import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CataService {
  private url = environment.baseUrl + '/admin';

  public category: any;

  constructor(private http?: HttpClient) { }

   createcategory(category: any): any {
    return this.http.post(this.url + '/catagory', category)
   }

   getcategories(category: string) {
      return category ? this.http.get(this.url + `/catagory/?status=False&&category=${category}`) : this.http.get(this.url + `/catagory/?status=False`)
   }
   getAllCategories() {
    return this.http.get(this.url + '/catagory')
 }
   getcategory(id: any) {
    return this.http.get(this.url + '/catagory/detail/' + id)
  }
   updatecategory(category: any) {
    return this.http.post(this.url + '/catagory/update', category)
  }

  deletecategory(id: any) {
    return this.http.delete(this.url + '/catagory/' + id)
  }
}
