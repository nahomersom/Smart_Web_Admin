import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CreatecategoryComponent } from './createcategory.component';
import { CataService } from '../cata.service';


describe('Create new Category component', () => {
    let beService: CataService;
    let page: CreatecategoryComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [FormBuilder, CataService]
      });
      page = new CreatecategoryComponent(beService, new FormBuilder());
      // inject the service
      beService = TestBed.get(CataService);
    });


    it('Category component : form should have a control', () => {
      expect(page.form.contains('title')).toBeTruthy();
      expect(page.form.contains('desc')).toBeTruthy();
      expect(page.form.contains('status')).toBeTruthy();

  });

  // validation
    it('Category component : form control should have a validation required', () => {
    const title = page.form.get('title');

    title.setValue('');
    expect(title.valid).toBeFalsy();

});

   // expecting the correct(but faked) result: propery with value
    it('Should create category successfull and redirect the to list', () => {
    const category = {
      id: '',
      title: 'Category 1',
      desc: 'This is the First Category',
      language: 'English',
      defaultCatagoryId: 0,
      status: true,
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const status = page.form.get('status');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('abebe');
    desc.setValue('this is our second category');
    status.setValue(true);

    beService.createcategory(category).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/category/view']);

    });
  });


    it('Should featch and fill the the requested data into form controls', () => {
    const title = page.form.controls.title;
    const desc = page.form.controls.desc;
    const status = page.form.controls.status;

    beService.getcategory(0).subscribe((data: any) => {
      title.setValue(data.title);
      desc.setValue(data.desc);
      status.setValue(data.status);

      expect(title.value).not.toBe('');
      expect(desc.value).not.toBe('');
      expect(status.value).not.toBe('');
    });

  });

    it('Should Update category successfull and redirect the to list', () => {
    const category = {
      id: 1,
      title: 'Category 1',
      desc: 'This is the First Category',
      language: 'English',
      defaultCatagoryId: 0,
      status: true,
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const status = page.form.get('status');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('Category 1');
    desc.setValue('This is the First Category');
    status.setValue(true);

    beService.updatecategory(category).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/category/view']);

    });
  });

});
