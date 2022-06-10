import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewmedia',
  templateUrl: './viewmedia.component.html',
  styleUrls: ['./viewmedia.component.css']
})
export class ViewmediaComponent implements OnInit {

  public medias: any;
  public media = 'media';
  public columensToDisplay: any[] = [];
  public searchField = 'title';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true, delete: true};

 constructor(private mediaService: MediaService, private router?: Router) {
   this.columensToDisplay.push({ field: 'title' , headerText: 'Title Of Category' , textAlign: 'left', width: 90 });
   this.columensToDisplay.push({ field: 'mediaType' , headerText: 'Media Type' , textAlign: 'left', width: 60 });
   this.columensToDisplay.push({ field: 'desc' , headerText: 'Description' , textAlign: 'left', width: 50 });
   this.columensToDisplay.push({ field: 'featured' , headerText: 'Show In Slidder' , textAlign: 'left', width: 70 ,
    displayAsCheckBox: 'true' });
 }

 ngOnInit() {
   this.mediaService.getMedias()
   .subscribe((data: any[]) => {
     this.medias = data;
   });
 }


 deleteMedia(item: any) {
  this.mediaService.deleteMedia(item)
  .subscribe((data: any[]) => {
    this.ngOnInit();
  });
}

 addNewMedia() {
   this.router.navigate(['dashboard/media/new']);
 }

}
