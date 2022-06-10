import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = environment.baseUrl + '/admin';
  public original_url = environment.baseUrl;

  public article: any;

  constructor(private http?: HttpClient) { }

   createArticle(article: any): any {
    return this.http.post(this.url + '/article', article);
   }

   getArticles() {
    return this.http.get(this.url + '/article');
   }

   getArticle(id: any) {
    return this.http.get(this.url + '/article/detail/' + id)
   }

   updateArticle(article: any) {
     return this.http.post(this.url + '/article/update', article)
  }

  deleteArticle(data: any) {
    return this.http.post(this.url + '/article/delete', data)
  }
  removeArticle(id: any) {
    return this.http.delete(this.url + '/article/remove/' + id)
  }
}
