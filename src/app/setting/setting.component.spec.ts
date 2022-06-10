import { Router, ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { SettingService } from './setting.service';
import { SettingComponent } from './setting.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('Setting component', () => {
    let settingService: SettingService;
    let router: Router;
    let actRouter: ActivatedRoute;
    let page: SettingComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [FormBuilder, SettingService]
      });
      // inject the service
      settingService = TestBed.get(SettingService);
      router = TestBed.get(Router);
      actRouter = TestBed.get(ActivatedRoute);

      page = new SettingComponent(settingService, new FormBuilder(), actRouter, router);


    });

    it(': form should have a control', () => {
      expect(page.form.contains('pobox')).toBeTruthy();
      expect(page.form.contains('email')).toBeTruthy();
      expect(page.form.contains('phone')).toBeTruthy();
      expect(page.form.contains('fax')).toBeTruthy();
      expect(page.form.contains('street')).toBeTruthy();
      expect(page.form.contains('latitude')).toBeTruthy();
      expect(page.form.contains('longtiude')).toBeTruthy();
      expect(page.form.contains('facebook')).toBeTruthy();
      expect(page.form.contains('linkedin')).toBeTruthy();
      expect(page.form.contains('twitter')).toBeTruthy();

  });

  // validation
    it(' : form control should have a validation required', () => {
    const email = page.form.get('email');
    const phone = page.form.get('phone');
    const street = page.form.get('street');

    email.setValue('dsgfdgfdgfd');
    expect(email.valid).toBeFalsy();

    phone.setValue('');
    expect(phone.valid).toBeFalsy();

    street.setValue('');
    expect(street.valid).toBeFalsy();

  });

   // expecting the correct(but faked) result: propery with value
    it(' : Should create Setting successfull and redirect the to list', () => {
    const setting = {
        id: '2',
        pobox: '2213',
        email: 'addis@standard.org',
        phone: '+251-011-55-098-78',
        street: 'Addis Ababa',
        fax: '+251-011-55-098-78',
        facebook: 'http://www.facebook.com/hprscoc',
        linkedin: 'http://www.linkedin.com/hprscoc',
        twitter: 'http://www.twitter.com/hprscoc',
        longtiude: '',
        latitude: '',
    };
    const pobox = page.form.get('pobox');
    const email = page.form.get('email');
    const phone = page.form.get('phone');
    const street = page.form.get('street');
    const fax = page.form.get('fax');
    const facebook = page.form.get('facebook');
    const linkedin = page.form.get('linkedin');
    const twitter = page.form.get('twitter');
    const longtiude = page.form.get('longtiude');
    const latitude = page.form.get('latitude');

    const spy = spyOn(router, 'navigate');

    pobox.setValue('2213');
    email.setValue('addis@standard.org');
    phone.setValue('+251-011-55-098-78');
    street.setValue('Addis Ababa');
    fax.setValue('+251-011-55-098-78');
    facebook.setValue('http://www.facebook.com/hprscoc');
    linkedin.setValue('http://www.linkedin.com/hprscoc');
    twitter.setValue('http://www.twitter.com/hprscoc');
    longtiude.setValue('45415');
    latitude.setValue('5415445');

    settingService.createsetting(setting).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['dashboard/']);
    });

  });

    it(' : Should featch and fill the the requested data into form controls', () => {
        const pobox = page.form.get('pobox');
        const email = page.form.get('email');
        const phone = page.form.get('phone');
        const street = page.form.get('street');
        const fax = page.form.get('fax');
        const facebook = page.form.get('facebook');
        const linkedin = page.form.get('linkedin');
        const twitter = page.form.get('twitter');
        const longtiude = page.form.get('longtiude');
        const latitude = page.form.get('latitude');

        settingService.getsettings().subscribe((data: any) => {
            pobox.setValue(data[0].pobox);
            email.setValue(data[0].email);
            phone.setValue(data[0].phone);
            street.setValue(data[0].street);
            fax.setValue(data[0].fax);
            facebook.setValue(data[0].facebook);
            linkedin.setValue(data[0].linkedin);
            twitter.setValue(data[0].twitter);
            longtiude.setValue(data[0].longtiude);
            latitude.setValue(data[0].latitude);

            expect(pobox.value).not.toBe('');
            expect(email.value).not.toBe('');
            expect(phone.value).not.toBe('');
            expect(street.value).not.toBe('');
            expect(fax.value).not.toBe('');
            expect(facebook.value).not.toBe('');
            expect(linkedin.value).not.toBe('');
            expect(twitter.value).not.toBe('');
            expect(longtiude.value).not.toBe('');
            expect(latitude.value).not.toBe('');
    });

  });


    it(' : Should Update Setting successfull and redirect the to list', () => {
        const setting = {
            id: '2',
            pobox: '2213',
            email: 'addis@standard.org',
            phone: '+251-011-55-098-78',
            street: 'Addis Ababa',
            fax: '+251-011-55-098-78',
            facebook: 'http://www.facebook.com/hprscoc',
            linkedin: 'http://www.linkedin.com/hprscoc',
            twitter: 'http://www.twitter.com/hprscoc',
            longtiude: '',
            latitude: '',
        };
        const pobox = page.form.get('pobox');
        const email = page.form.get('email');
        const phone = page.form.get('phone');
        const street = page.form.get('street');
        const fax = page.form.get('fax');
        const facebook = page.form.get('facebook');
        const linkedin = page.form.get('linkedin');
        const twitter = page.form.get('twitter');
        const longtiude = page.form.get('longtiude');
        const latitude = page.form.get('latitude');

        const spy = spyOn(router, 'navigate');

        pobox.setValue('2213');
        email.setValue('addis@standard.org');
        phone.setValue('+251-011-55-098-78');
        street.setValue('Addis Ababa');
        fax.setValue('+251-011-55-098-78');
        facebook.setValue('http://www.facebook.com/hprscoc');
        linkedin.setValue('http://www.linkedin.com/hprscoc');
        twitter.setValue('http://www.twitter.com/hprscoc');
        longtiude.setValue('45415');
        latitude.setValue('5415445');

        settingService.updatesetting(setting).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['dashboard/']);
    });
  });


});
