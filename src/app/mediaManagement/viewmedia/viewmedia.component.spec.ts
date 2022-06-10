import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaService } from '../services/media.service';
import { ViewmediaComponent } from './viewmedia.component';



describe('View Media component', () => {
    let mediaService: MediaService;
    let page: ViewmediaComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],

        providers: [MediaService]
      });

      page = new ViewmediaComponent(mediaService);

      // inject the service
      mediaService = TestBed.get(MediaService);
    });

    it('Should load media items and populate Data Grid ', () => {
    const response = {
        id: 1,
        title: 'Image One',
        desc: 'This is Our First Image',
        mediaType: 'Images',
        featured: true,
        album: 'Images',
        mediaUrl: '/assets/image/1.jpeg'
    };

    mediaService.getMedias().subscribe((data: any) => {
        expect(page.medias).toBeGreaterThan(0);
    });

  });

    it('Should delete Media item', () => {
    mediaService.deleteMedia(1).subscribe((data: any) => {
      page.ngOnInit();
    });

  });

});
