import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CataService } from '../cata.service';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent implements OnInit {
  public form: FormGroup;

  public formSubmitted = false;
  public invalidClass = false;
  public hideCreateButton = true;
  public hideSaveChangesButton = false;
  public currentEditingID: any;
  public categories = ["Media", "Document", "Article"]
  public ddlelementData: string[] = ['Amharic', 'Oromifa', 'Harari'];

  public headerText: any = [{ text: 'English (Default)' }, { text: 'Local Language' }];

  constructor(private beService: CataService, private fb: FormBuilder, private router?: Router,
              private actRoute?: ActivatedRoute) {
    this.form = this.fb.group({
      title : ['', Validators.required],
      desc : [''],
      category : [''],
      status : [false],
      show_events : [false],
    });
  }

  get gettitle(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get getdesc(): FormControl {
    return this.form.get('desc') as FormControl;
  }
  get getstatus(): FormControl {
    return this.form.get('status') as FormControl;
  }
  get getCategory(): FormControl {
    return this.form.get('category') as FormControl;
  }
  get getShowEvents(): FormControl {
    return this.form.get('show_events') as FormControl;
  }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;
    if (id !== undefined) {
      this.beService.getcategory(id)
      .subscribe((data: any) => {
         this.gettitle.setValue(data.title);
         this.getdesc.setValue(data.desc);
         this.getstatus.setValue(data.status === 'True' ? true : false);
         this.getShowEvents.setValue(data.show_events === 'True' ? true : false);
         this.getCategory.setValue(data.category);
         this.hideCreateButton = false;
         this.hideSaveChangesButton = true;
         this.currentEditingID = data.id;
       });
    }
  }

  onSubmit(): any {
    if (this.gettitle.errors) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;
          
    } else {
          this.invalidClass = false;
          if (this.hideCreateButton) {
            return this.beService.createcategory(
              {
                title : this.form.controls.title.value,
                desc : this.form.controls.desc.value,
                status : this.form.controls.status.value ? 'True' : 'False',
                show_events : this.form.controls.show_events.value ? 'True' : 'False',
                category: this.getCategory.value
              })
                .subscribe((response: any) => {
                  if(response.status){
                    this.router.navigate(['dashboard/category/view']);
                  }

                });
          } else {
            return this.beService.updatecategory(
              {
                id: this.currentEditingID,
                title : this.form.controls.title.value,
                desc : this.form.controls.desc.value,
                status : this.form.controls.status.value ? 'True' : 'False',
                show_events : this.form.controls.show_events.value ? 'True' : 'False',
                category: this.getCategory.value
              })
                .subscribe((response: any) => {
                  if(response.status){
                    this.currentEditingID = '';
                    this.router.navigate(['dashboard/category/view']);
                  }
                  
                });
          }
    }

  }

}
