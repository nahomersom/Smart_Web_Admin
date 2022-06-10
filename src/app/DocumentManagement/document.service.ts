import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url = environment.baseUrl + '/admin';

  public document: any;

  constructor(private http?: HttpClient) { }

   createdocument(document: any): any {
    return this.http.post(this.url + '/document', document)
   }
   getdocuments() {
    return this.http.get(this.url + '/document')
   }

   getdocument(id: any) {
    return this.http.get(this.url + '/document/detail/' + id)
   }

   updatedocument(document: any) {
    return this.http.post(this.url + '/document/update', document);
  }

  deletedocument(data: any) {
    return this.http.post(this.url + '/document/delete', data)
  }

  removedocument(id: any) {
    return this.http.delete(this.url + '/document/remove/' + id)
  }
}
