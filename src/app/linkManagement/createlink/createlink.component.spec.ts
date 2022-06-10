import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkService } from '../service/link.service';
import { CreatelinkComponent } from './createlink.component';


describe('Create new Quick Link component', () => {
    let linkService: LinkService;
    let page: CreatelinkComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [FormBuilder, LinkService]
      });
      page = new CreatelinkComponent(linkService, new FormBuilder());

      // inject the service
      linkService = TestBed.get(LinkService);

    });


    it('Quick Link component : form should have a control', () => {
      expect(page.form.contains('title')).toBeTruthy();
      expect(page.form.contains('desc')).toBeTruthy();
      expect(page.form.contains('status')).toBeTruthy();
      expect(page.form.contains('address')).toBeTruthy();

  });

  // validation
    it('Quick Link component : form control should have a validation required', () => {
    const title = page.form.get('title');
    const address = page.form.get('address');

    title.setValue('');
    expect(title.valid).toBeFalsy();

    address.setValue('');
    expect(address.valid).toBeFalsy();
});

    it('Quick Link component : Should create FormArray', () => {
      page.addLocalLanguage();
      expect(page.getlocalLanguage.length).toBeGreaterThan(0);
});

    it('Quick Link component : Should Remove FormArray', () => {
  const spy = spyOn(window, 'confirm');
  page.RemoveOtherLanguage(0, 0);
  expect(spy).toHaveBeenCalledWith('Are you sure you want to delete');
  expect(page.getlocalLanguage.length).not.toBeGreaterThan(0);
});

   // expecting the correct(but faked) result: propery with value
    it('Should create Quick Link successfull and redirect the to list', () => {
    const link = {
        id: 1,
        title: 'Link 1',
        desc: 'this is link 1',
        address: 'www.google.com/images',
        language: 'English',
        status: true,
        other: []
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const address = page.form.get('address');
    const status = page.form.get('status');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('Link 1');
    desc.setValue('this is link 1');
    address.setValue('www.google.com/images');
    status.setValue(true);

    linkService.createlink(link).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/link/view']);

    });
  });

    it('Should featch and fill the the requested data into form controls', () => {
    const title = page.form.controls.title;
    const desc = page.form.controls.desc;
    const address = page.form.controls.address;
    const status = page.form.controls.status;

    linkService.getlink(0).subscribe((data: any) => {
      title.setValue(data.title);
      desc.setValue(data.desc);
      address.setValue(data.address);
      status.setValue(data.status);

      expect(title.value).not.toBe('');
      expect(desc.value).not.toBe('');
      expect(address.value).not.toBe('');
      expect(status.value).not.toBe('');
    });

  });

    it('Should Update Quick Link successfull and redirect the to list', () => {
    const link = {
        id: 1,
        title: 'Link 1',
        desc: 'this is link 1',
        address: 'www.google.com/images',
        language: 'English',
        status: true,
        other: []
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const address = page.form.get('address');
    const status = page.form.get('status');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('Link 1');
    desc.setValue('this is link 1');
    address.setValue('www.google.com/images');
    status.setValue(true);

    linkService.updatelink(link).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/link/view']);

    });
  });

});
