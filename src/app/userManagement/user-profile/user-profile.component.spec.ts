import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { BackendService } from '../backend-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfileComponent } from './user-profile.component';


describe('UserProfile Component', () => {
    let beService: BackendService;
    let page: UserProfileComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [BackendService]
      });
      page = new UserProfileComponent(beService);

      // inject the service
      beService = TestBed.get(BackendService);
    });


    it('UserProfile Component: form should have a control', () => {
        expect(page.formgroup.contains('fullName')).toBeTruthy();
        expect(page.formgroup.contains('email')).toBeTruthy();
        expect(page.formgroup.contains('oldpassword')).toBeTruthy();
        expect(page.formgroup.contains('password')).toBeTruthy();
        expect(page.formgroup.contains('repassword')).toBeTruthy();

  });

  // validation
    it('UserProfile Component : form control should have a validation required', () => {
        const fullName = page.formgroup.get('fullName');
        const oldpassword = page.formgroup.get('oldpassword');
        const password = page.formgroup.get('password');
        const repassword = page.formgroup.get('repassword');

        fullName.setValue('');
        expect(fullName.valid).toBeFalsy();

        oldpassword.setValue('');
        expect(oldpassword.valid).toBeFalsy();

        password.setValue('');
        expect(password.valid).toBeFalsy();

        repassword.setValue('');
        expect(repassword.valid).toBeFalsy();

});


   // expecting the correct(but faked) result: propery with value
    it('Should Update user Profile successfull, alert Message and redirect the user', () => {
    const newprofile = {
      id: 2,
      fullname: 'Surafel Habte',
      email: 'sura@gmail.com',
      password: 'abcd1234',
    };

    const fullName = page.formgroup.get('fullName');
    const email = page.formgroup.get('email');
    const oldpassword = page.formgroup.get('oldpassword');
    const password = page.formgroup.get('password');
    const repassword = page.formgroup.get('repassword');
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    const spyWindow = spyOn(window, 'alert');

    fullName.setValue('Surafel Habte');
    email.setValue('sura@gmail.com');
    oldpassword.setValue('abc@1234');
    password.setValue('abcd1234');
    repassword.setValue('abcd1234');

    beService.updateActorprofile(newprofile).subscribe((data: any) => {
      expect(spyWindow).toHaveBeenCalledWith(['User Profile Successfully !']);
      expect(spy).toHaveBeenCalledWith(['login']);

    });
  });



});
