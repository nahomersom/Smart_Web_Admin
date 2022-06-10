import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CataService } from 'src/app/categoryManagement/cata.service';
import { DocumentService } from '../document.service';
import { CreateDocumentComponent } from './createdocument.component';
import { environment } from 'src/environments/environment';


describe('Create New Document component', () => {
    let documentService: DocumentService;
    let cataService: CataService;
    let router: Router;
    let actRouter: ActivatedRoute;

    let page: CreateDocumentComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [FormBuilder, DocumentService, CataService]
    });

          // inject the service
      documentService = TestBed.get(DocumentService);
      cataService = TestBed.get(CataService);
      router = TestBed.get(Router);
      actRouter = TestBed.get(ActivatedRoute);

      page = new CreateDocumentComponent(documentService, cataService, new FormBuilder(), actRouter, router);

    });

    it(' : form should have a control', () => {
      expect(page.form.contains('title')).toBeTruthy();
      expect(page.form.contains('desc')).toBeTruthy();
      expect(page.form.contains('categoryId')).toBeTruthy();
      expect(page.form.contains('document')).toBeTruthy();
      expect(page.form.contains('status')).toBeTruthy();
      expect(page.form.contains('memberOnly')).toBeTruthy();

  });

  // validation
    it(' : form control should have a validation required', () => {
    const title = page.form.get('title');
    const document = page.form.get('document');
    const categoryId = page.form.get('categoryId');

    title.setValue('');
    expect(title.valid).toBeFalsy();

    document.setValue('');
    expect(document.valid).toBeFalsy();

    categoryId.setValue('');
    expect(categoryId.valid).toBeFalsy();

  });

    it(' : Should create FormArray', () => {
  page.addLocalLanguage();
  expect(page.getlocalLanguage.length).toBeGreaterThan(0);
  });

    it(' : Should Remove FormArray', () => {
    const spy = spyOn(window, 'confirm');
    page.RemoveOtherLanguage(0, 0);
    expect(spy).toHaveBeenCalledWith('Are you sure you want to delete');
    expect(page.getlocalLanguage.length).not.toBeGreaterThan(0);
  });

   // expecting the correct(but faked) result: propery with value
    it(' : Should create Document successfull and redirect the to list', () => {
    const documentData = {
        title: 'document 1',
        desc: 'this is document one',
        categoryId: 'News',
        document: environment.baseUrl + '/uploads/document/1565105264.docx',
        language: 'English',
        memberOnly: 'False',
        status: 'True',
        other: []
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const categoryId = page.form.get('categoryId');
    const document = page.form.get('document');
    const status = page.form.get('status');
    const memberOnly = page.form.get('memberOnly');

    const spy = spyOn(router, 'navigate');

    title.setValue('document 1');
    desc.setValue('this is document one');
    categoryId.setValue(1),
    document.setValue( environment.baseUrl + '/uploads/document/1565105264.docx');
    memberOnly.setValue(false);
    status.setValue(true);

    documentService.createdocument(documentData).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['dashboard/document/view']);

    });
  });

    it(' : Should load Category items and populate drop down list', () => {
    const response = {
        id: 1,
        title: 'Category 1',
        desc: 'This is the First Category',
        language: 'English',
        status: true,
    };

    cataService.getcategories().subscribe((data: any) => {
        expect(data[0].title).toBe('Category 1');
        expect(page.ddlelementDataCategory).toBeGreaterThan(0);
    });
  });

    it(' : Should featch and fill the the requested data into form controls', () => {
        const title = page.form.get('title');
        const desc = page.form.get('desc');
        const categoryId = page.form.get('categoryId');
        const status = page.form.get('status');
        const memberOnly = page.form.get('memberOnly');

        documentService.getdocument(0).subscribe((data: any) => {
            title.setValue(data.title);
            desc.setValue(data.desc);
            categoryId.setValue(data.categoryId),
            memberOnly.setValue(data.memberOnly);
            status.setValue(data.status);

            expect(title.value).not.toBe('');
            expect(desc.value).not.toBe('');
            expect(categoryId.value).not.toBe('');
            expect(status.value).not.toBe('');
            expect(memberOnly.value).not.toBe('');
    });

  });

    it(' : Should Update Document successfull and redirect the to list', () => {
    const documentData = {
        id: '5',
        title: 'document 1',
        desc: 'this is document one',
        categoryId: 'News',
        parentId: '4',
        document: environment.baseUrl + '/uploads/document/1565105264.docx',
        language: 'English',
        memberOnly: 'False',
        status: 'True'
    };
    const title = page.form.get('title');
    const desc = page.form.get('desc');
    const categoryId = page.form.get('categoryId');
    const document = page.form.get('document');
    const status = page.form.get('status');
    const memberOnly = page.form.get('memberOnly');

    const spy = spyOn(router, 'navigate');

    title.setValue('document 1');
    desc.setValue('this is document one');
    categoryId.setValue(1),
    document.setValue( environment.baseUrl + '/uploads/document/1565105264.docx');
    memberOnly.setValue(false);
    status.setValue(true);

    documentService.updatedocument(documentData).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['dashboard/document/view']);
    });
  });


});
