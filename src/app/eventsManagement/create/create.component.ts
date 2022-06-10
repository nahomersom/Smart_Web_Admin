import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../app/eventsManagement/service/events.service';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    public formGroup: FormGroup;
    public formSubmitted = false;

    public id: any = undefined;
    public languages: string[] = ['Amharic', 'Oromifa', 'Harari'];
    public headerText: any = [{ text: 'English (Default)' }, { text: 'Local Language' }];

    public today: Date = new Date();
    public minDate: Object =  new Date(this.today.getFullYear(),null,null);

  
    constructor(private service: EventsService, private router?: Router, private actRoute?: ActivatedRoute) {
      this.formGroup = new FormGroup({
        id : new FormControl(''),
        title : new FormControl('', Validators.required),
        description : new FormControl('', Validators.required),
        date : new FormControl('', Validators.required),
        language : new FormControl('English'),
        other: new FormArray([])
      });

    }
  
    public getControls(name) {
      return this.formGroup.get(name) as FormControl;
    }
  
    get getOthers(): FormArray {
      return this.formGroup.get('other') as FormArray;
    }

    getFormGroup(index): FormGroup {
      return this.getOthers.controls[index] as FormGroup;
    }
  
    ngOnInit() {
      const id = this.actRoute.snapshot.params.id;
      if (id !== undefined) {
        this.service.get(id)
        .subscribe((data: any) => {
          this.id = data.id;
          this.getControls('id').setValue(data.id);
          this.getControls('title').setValue(data.title);
          this.getControls('description').setValue(data.description);
          this.getControls('date').setValue(data.date);

          if(data.other !== undefined && data.other.length > 0) {
            data.other.forEach(element => { 
              this.addOther(element)               
            });
          }
  
        });
      }
    }

    onSubmit(): any {
      if (this.formGroup.invalid) {
        this.formSubmitted = true;
        return;

      } else {
        if(this.id === undefined) {
          return this.service.create(this.formGroup.value)
            .subscribe((response: any) => {
              response.status ? this.router.navigate(['dashboard/event/view']) : alert(response.message);

            });
            
        } else {
          return this.service.update(this.formGroup.value)
            .subscribe((response: any) => {
              response.status ? this.router.navigate(['dashboard/event/view']) : alert(response.message);

          });
        }
      }

    }
  
    addOther(data?: any) {
      this.getOthers.push(
        new FormGroup ({
          id : new FormControl(data !== undefined ? data.id : undefined),
          title : new FormControl(data !== undefined ? data.title : '', Validators.required),
          description : new FormControl(data !== undefined ? data.description : '', Validators.required),
          date : new FormControl(data !== undefined ? data.date : ''),
          language : new FormControl(data !== undefined ? data.language : '', Validators.required)
       }));
    }
  
    Remove(index: number, db_id: any): any {
      if (confirm('Are you sure you want to delete')) {
        if(db_id !== undefined){
          return this.service.remove(db_id).subscribe((response: any) => {
            if(response.status){
              this.getOthers.removeAt(index);
            }
          });

        } else {
          this.getOthers.removeAt(index);

        }
      }
    }

}
