import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CreatemenuComponent } from './createmenu.component';
import { MenuService } from '../menu.service';
import { CataService } from 'src/app/categoryManagement/cata.service';


describe('Create New Menu component', () => {
    let menuService: MenuService;
    let cataService: CataService;

    let page: CreatemenuComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [FormBuilder, MenuService, CataService]
      });
      page = new CreatemenuComponent(menuService, cataService, new FormBuilder());

      // inject the service
      menuService = TestBed.get(MenuService);
      cataService = TestBed.get(CataService);

    });

    it('Create New Menu component : form should have a control', () => {
      expect(page.form.contains('title')).toBeTruthy();
      expect(page.form.contains('desc')).toBeTruthy();
      expect(page.form.contains('categoryId')).toBeTruthy();
      expect(page.form.contains('status')).toBeTruthy();

  });

  // validation
    it('Create New Menu component : form control should have a validation required', () => {
    const title = page.form.get('title');
    const categoryId = page.form.get('categoryId');


    title.setValue('');
    expect(title.valid).toBeFalsy();

    categoryId.setValue('');
    expect(categoryId.valid).toBeFalsy();

  });

    it('Menu component : Should create FormArray', () => {
  page.addLocalLanguage();
  expect(page.getlocalLanguage.length).toBeGreaterThan(0);
  });

    it('Menu component : Should Remove FormArray', () => {
const spy = spyOn(window, 'confirm');
page.RemoveOtherLanguage(0, 0);
expect(spy).toHaveBeenCalledWith('Are you sure you want to delete');
expect(page.getlocalLanguage.length).not.toBeGreaterThan(0);
  });

   // expecting the correct(but faked) result: propery with value
    it('Should create Menu successfull and redirect the to list', () => {
    const menu = {
        id: 1,
        title: 'Menu 1',
        desc: 'This is Our First  Menu ',
        categoryId: '1',
        language: 'Harari',
        defaultmenuId: '1',
        status: true
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const categoryId = page.form.get('categoryId');
    const status = page.form.get('status');

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('Menu 1');
    desc.setValue('This is Our First  Menu ');
    categoryId.setValue(1),
    status.setValue(true);

    menuService.createmenu(menu).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/menu/view']);

    });
  });

    it('Should load Menu items and populate drop down list', () => {
    const response = {
        id: 1,
        title: 'Category 1',
        desc: 'This is the First Category',
        language: 'Oromifa',
        defaultCatagoryId: '1',
        status: true
    };

    cataService.getcategories().subscribe((data: any) => {
        expect(data[0].title).toBe('Category 1');
        expect(page.ddlelementDataCategory).toBeGreaterThan(0);
    });
  });

    it('Should featch and fill the the requested data into form controls', () => {
    const title = page.form.controls.title;
    const desc = page.form.controls.desc;
    const status = page.form.controls.status;
    const categoryId = page.form.controls.categoryId;


    menuService.getmenu(0).subscribe((data: any) => {
      title.setValue(data.title);
      desc.setValue(data.desc);
      status.setValue(data.status);
      categoryId.setValue(data.categoryId);

      expect(title.value).not.toBe('');
      expect(desc.value).not.toBe('');
      expect(status.value).not.toBe('');
      expect(categoryId.value).not.toBe('');
    });

  });

    it('Should Update Menu successfull and redirect the to list', () => {
    const menu = {
      id: 1,
      title: 'Menu 1',
      desc: 'This is Our First  Menu ',
      categoryId: '1',
      language: 'English',
      defaultmenuId: 0,
      status: true,
      other: []
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const status = page.form.get('status');
    const categoryId = page.form.get('categoryId');


    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('Menu 1');
    desc.setValue('This is Our First  Menu ');
    status.setValue(true);
    categoryId.setValue(1);

    menuService.updatemenu(menu).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/menu/view']);

    });
  });

});
