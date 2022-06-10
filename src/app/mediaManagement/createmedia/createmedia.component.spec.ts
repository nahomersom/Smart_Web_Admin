import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaService } from '../services/media.service';
import { CreatemediaComponent } from './createmedia.component';


describe('Create new Media component', () => {
    let mediaService: MediaService;
    let router: Router;
    let actiRoute: ActivatedRoute;
    let page: CreatemediaComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
          providers: [FormBuilder, MediaService]
        });
        // inject the service
        mediaService = TestBed.get(MediaService);
        router = TestBed.get(Router);
        actiRoute = TestBed.get(ActivatedRoute);

        page = new CreatemediaComponent(mediaService, new FormBuilder(), router, actiRoute);


    });

    it(' : form should have a control', () => {
      expect(page.form.contains('title')).toBeTruthy();
      expect(page.form.contains('desc')).toBeTruthy();
      expect(page.form.contains('featured')).toBeTruthy();
      expect(page.form.contains('mediaType')).toBeTruthy();
      expect(page.form.contains('album')).toBeTruthy();
      expect(page.form.contains('newAlbum')).toBeTruthy();
      expect(page.form.contains('mediaUrl')).toBeTruthy();
  });

  // validation
    it(' : form control should have a validation required', () => {
    const title = page.form.get('title');
    const mediaType = page.form.get('mediaType');
    const album = page.form.get('album');
    const newAlbum = page.form.get('newAlbum');
    const mediaUrl = page.form.get('mediaUrl');

    title.setValue('');
    expect(title.valid).toBeFalsy();

    mediaType.setValue('');
    expect(title.valid).toBeFalsy();

    album.setValue('');
    expect(title.valid).toBeFalsy();

    newAlbum.setValue('');
    expect(title.valid).toBeFalsy();

    mediaUrl.setValue('');
    expect(title.valid).toBeFalsy();

  });

   // expecting the correct(but faked) result: propery with value
    it(' : Should create media successfull and redirect the to list', () => {
    const media = {
        id: 1,
        title: 'Image One',
        desc: 'This is Our First Image',
        mediaType: 'Images',
        featured: true,
        album: 'Images',
        mediaUrl: '/assets/image/1.jpeg'
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const mediaType = page.form.get('mediaType');
    const featured = page.form.get('featured');
    const album = page.form.get('album');
    const mediaUrl = page.form.get('mediaUrl');


    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('Image One');
    desc.setValue('This is Our First Image');
    mediaType.setValue('Images');
    featured.setValue(true);
    album.setValue('Images');
    mediaUrl.setValue('/assets/image/1.jpeg');

    mediaService.createMedia(media).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/media/view']);

    });
  });

    it(' : Should featch and fill the the requested data into form controls', () => {
        const title = page.form.get('title');
        const desc = page.form.get('desc');
        const mediaType = page.form.get('mediaType');
        const featured = page.form.get('featured');
        const album = page.form.get('album');
        const mediaUrl = page.form.get('mediaUrl');

        mediaService.getMedia(0).subscribe((data: any) => {
        title.setValue('Image One');
        desc.setValue('This is Our First Image');
        mediaType.setValue('Images');
        featured.setValue(true);
        album.setValue('Images');
        mediaUrl.setValue('/assets/image/1.jpeg');

        expect(title.value).not.toBe('');
        expect(desc.value).not.toBe('');
        expect(mediaType.value).not.toBe('');
        expect(featured.value).not.toBe('');
        expect(album.value).not.toBe('');
        expect(mediaUrl.value).not.toBe('');
    });

  });


    it(' : Should Update media successfull and redirect the to list', () => {
    const media = {
        id: 1,
        title: 'Image One',
        desc: 'This is Our First Image',
        mediaType: 'Images',
        featured: true,
        album: 'Images',
        mediaUrl: '/assets/image/1.jpeg'
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const mediaType = page.form.get('mediaType');
    const featured = page.form.get('featured');
    const album = page.form.get('album');
    const mediaUrl = page.form.get('mediaUrl');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('Image One');
    desc.setValue('This is Our First Image');
    mediaType.setValue('Images');
    featured.setValue(true);
    album.setValue('Images');
    mediaUrl.setValue('/assets/image/1.jpeg');

    mediaService.updateMedia(media).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/media/view']);

    });
  });

});
