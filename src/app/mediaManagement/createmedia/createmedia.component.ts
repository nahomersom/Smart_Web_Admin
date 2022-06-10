import { Component, OnInit} from '@angular/core';
import { MediaService } from '../services/media.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { CataService } from 'src/app/categoryManagement/cata.service';

@Component({
  selector: 'app-createmedia',
  templateUrl: './createmedia.component.html',
  styleUrls: ['./createmedia.component.css']
})
export class CreatemediaComponent implements OnInit {
  public form: FormGroup;

  public formSubmitted = false;
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;
  public categories: any[] = [];
  public fields: object = { text: 'title', value: 'id' };

  public ddlelementDataMediaType: any[] = ['Images', 'Video'];
  public ddlelementDataAlbum: any[] = ['New', 'Images', 'Video'];



  public input = new FormData();

  myFiles: string[] = [];

  public preLoadFiles: any[];
  public mediaName = '';
  public mediaUrl = '';
  public file_url;

  constructor(public mediaService: MediaService, private catService: CataService, private fb?: FormBuilder, private router?: Router, private actRoute?: ActivatedRoute) {
    this.form = this.fb.group({
      title : [null, Validators.required],
      desc : [null],
      featured : [false],
      mediaType : [null, Validators.required],
      category : [null, Validators.required],
      // newAlbum : [null, Validators.required],
      mediaUrl : [null, [Validators.required, CustomValidators.url]],
      media : new FormControl(null,Validators.required)
    });
    this.ngOnInit();
  }

  get gettitle(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get getdesc(): FormControl {
    return this.form.get('desc') as FormControl;
  }
  get getfeatured(): FormControl {
    return this.form.get('featured') as FormControl;
  }
  get getMediaType(): FormControl {
    return this.form.get('mediaType') as FormControl;
  }
  get getmediaUrl(): FormControl {
    return this.form.get('mediaUrl') as FormControl;
  }
  get getmedia(): FormControl {
    return this.form.get('media') as FormControl;
  }
  get getCategory(): FormControl {
    return this.form.get('category') as FormControl;
  }
  get getnewAlbum(): FormControl {
    return this.form.get('newAlbum') as FormControl;
  }

  ngOnInit() {
    this.loadCategory();
    const id = this.actRoute.snapshot.params.id;
    if (id !== undefined) {
      this.mediaService.getMedia(id)
      .subscribe((data: any) => {
         this.gettitle.setValue(data.title);
         this.getdesc.setValue(data.desc);
         this.getMediaType.setValue(data.mediaType);
         this.getCategory.setValue(data.categoryId);
         this.getfeatured.setValue(data.featured === 'True' ? true : false);
         this.mediaName = data.mediaName;

         if (data.mediaName === '') {
           this.getmediaUrl.setValue(data.media);
           this.file_url = data.media;

         } else {
          const url = this.form.get('mediaUrl');
          url.clearValidators();
          url.updateValueAndValidity();

          this.file_url = this.mediaService.original_url + '/' + data.media;
          
        }

         this.getCategory.setValue(data.category);
         this.mediaUrl = data.media;
         this.hideCreateButton = false;
         this.hideSaveChangesButton = true;
         this.currentEditingID = data.id;
       });
    }
  }

  createNewAlbum() {
    this.ddlelementDataAlbum.push(this.getnewAlbum.value);
   }

  onFileChangeMedia(file) {
    const i = file.filesData;
    if (i.length > 0) {
      this.getmediaUrl.disable();
      this.form.get('media').setValue(i[0].rawFile);
    }
  }

  onFileClearMedia($event) {
    this.getmediaUrl.enable();
    this.getmedia.setValue('');
  }

  onSubmit(): any {
    if (this.validation()) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;
    } else {
      this.invalidClass = false;
      const formData = this.prepareSave();
      if (this.hideCreateButton) {
        return this.mediaService.createMedia(formData)
            .subscribe((response: any) =>  {
              if (response.status) {
                this.router.navigate(['dashboard/media/view']);

              } else {
                alert(response.message);
                return;

              }
              
            });
      } else {
        this.input.append('id', this.currentEditingID);
       
        return this.mediaService.updateMedia(formData)
            .subscribe((response: any) => {
              if (response.status) {
                this.currentEditingID = '';
                alert('saved !');
                this.router.navigate(['dashboard/media/view']);
                
              } else {
                 alert('Error Occured While Updating Media.');
                return;
              }
             
            });
      }
    }
  }

  private prepareSave(): any {
    this.input.append('title', this.form.controls.title.value);
    this.input.append('desc', this.form.controls.desc.value);
    this.input.append('mediaType', this.form.controls.mediaType.value);
    this.input.append('featured', this.form.controls.featured.value ? 'True' : 'False');
    this.input.append('categoryId', this.form.controls.category.value);
    // this.input.append('album', this.form.controls.album.value ? this.form.controls.album.value : this.getnewAlbum.value);
    this.input.append('mediaName', this.mediaName ?? '');
    this.input.append('media', this.form.controls.media.value ? this.form.controls.media.value : this.getmediaUrl.value || this.mediaUrl);
    return this.input;
  }

  validation() {
    if (this.hideCreateButton) {
      if (this.gettitle.errors || this.getMediaType.errors || this.getmediaUrl.errors || this.getCategory.errors) {
        return true;
      }
    } else {
      if (this.gettitle.errors || this.getMediaType.errors || this.getmediaUrl.errors
        || this.getCategory.errors) {
        return true;
      }
    }
  }

   loadCategory() {
    this.catService.getcategories('Media')
    .subscribe((data: any[]) => {
      const incomingData = data;
      if (incomingData.length > 0) {
        this.categories = incomingData;
      }
    });
  }


}
