import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  public url = environment.baseUrl + '/admin';
  public original_url = environment.baseUrl;

  public Media: any;

  constructor(private http?: HttpClient) { }

   createMedia(media: any): any {
    return this.http.post(this.url + '/media', media);
   }

   getMedias() {
      return this.http.get(this.url + '/media');
   }
   getMedia(id: any) {
    return this.http.get(this.url + '/media/detail/' + id)
  }
   updateMedia(media: any) {
    return this.http.post(this.url + '/media/update/', media);
  }

  deleteMedia(item: any) {
    return this.http.post(this.url + '/media/delete', item);
  }
}
