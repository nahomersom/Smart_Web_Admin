import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CataService } from 'src/app/categoryManagement/cata.service';
import { ArticleService } from '../Services/article.service';
import { CreatearticleComponent } from './createarticle.component';


describe('Create New Article component', () => {
    let articleService: ArticleService;
    let cataService: CataService;

    let page: CreatearticleComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({

        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [FormBuilder, ArticleService, CataService]
      });
      page = new CreatearticleComponent(articleService, cataService, new FormBuilder());

      // inject the service
      articleService = TestBed.get(ArticleService);
      cataService = TestBed.get(CataService);

    });

    it('Create New Article component : form should have a control', () => {
      expect(page.form.contains('title')).toBeTruthy();
      expect(page.form.contains('categoryId')).toBeTruthy();
      expect(page.form.contains('body')).toBeTruthy();
      expect(page.form.contains('featured')).toBeTruthy();
      expect(page.form.contains('allowComment')).toBeTruthy();
      expect(page.form.contains('status')).toBeTruthy();

  });

  // validation
    it('Create New Article component : form control should have a validation required', () => {
    const title = page.form.get('title');
    const body = page.form.get('body');
    const categoryId = page.form.get('categoryId');

    title.setValue('');
    expect(title.valid).toBeFalsy();

    body.setValue('');
    expect(body.valid).toBeFalsy();

    categoryId.setValue('');
    expect(categoryId.valid).toBeFalsy();


  });

    it('Article component : Should create FormArray', () => {
  page.addLocalLanguage();
  expect(page.getlocalLanguage.length).toBeGreaterThan(0);
  });

    it('Article component : Should Remove FormArray', () => {
    const spy = spyOn(window, 'confirm');
    page.RemoveOtherLanguage(0, 0);
    expect(spy).toHaveBeenCalledWith('Are you sure you want to delete');
    expect(page.getlocalLanguage.length).not.toBeGreaterThan(0);
  });

   // expecting the correct(but faked) result: propery with value
    it('Should create Article successfull and redirect the to list', () => {
    const article = {
        id: 1,
        title: 'About the Company',
        body: 'This is Our First  Article',
        categoryId: 'About Us',
        language: 'English',
        defaultArticleId: 0,
        status: false,
        featured: true,
        allowComment: false,
        other: []
    };
    const title = page.form.get('title');
    const body = page.form.get('body');
    const featured = page.form.get('featured');
    const categoryId = page.form.get('categoryId');
    const status = page.form.get('status');
    const allowComment = page.form.get('allowComment');


    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('About the Company');
    body.setValue('This is Our First  Article ');
    featured.setValue(false);
    categoryId.setValue(1),
    status.setValue(true);
    allowComment.setValue(false);

    articleService.createArticle(article).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/article/view']);

    });
  });

    it('Should load Category items and populate drop down list', () => {
    const response = {
        id: 1,
        title: 'Category 1',
        desc: 'This is the First Category',
        language: 'Oromifa',
        defaultCatagoryId: '1',
        status: true,
    };

    cataService.getcategories('Article').subscribe((data: any) => {
        expect(data[0].title).toBe('Category 1');
        expect(page.ddlelementDataCategory).toBeGreaterThan(0);
    });
  });

    it('Should featch and fill the the requested data into form controls', () => {
    const title = page.form.controls.title;
    const body = page.form.controls.body;
    const featured = page.form.controls.featured;
    const categoryId = page.form.controls.categoryId;
    const status = page.form.controls.status;
    const allowComment = page.form.controls.allowComment;

    articleService.getArticle(0).subscribe((data: any) => {
      title.setValue(data.title);
      body.setValue(data.body);
      featured.setValue(data.featured);
      categoryId.setValue(data.categoryId);
      status.setValue(data.status);
      allowComment.setValue(data.allowComment);

      expect(title.value).not.toBe('');
      expect(body.value).not.toBe('');
      expect(featured.value).not.toBe('');
      expect(categoryId.value).not.toBe('');
      expect(status.value).not.toBe('');
      expect(allowComment.value).not.toBe('');

    });

  });

    it('Should Update Article successfull and redirect the to list', () => {
    const article = {
        id: 1,
        title: 'About the Company',
        body: 'This is Our First  Article',
        categoryId: 'About Us',
        language: 'English',
        defaultArticleId: 0,
        status: false,
        featured: true,
        allowComment: false,
        other: []
    };
    const title = page.form.get('title');
    const body = page.form.get('body');
    const featured = page.form.get('featured');
    const categoryId = page.form.get('categoryId');
    const status = page.form.get('status');
    const allowComment = page.form.get('allowComment');


    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    title.setValue('About the Company');
    body.setValue('This is Our First  Article');
    featured.setValue(false);
    categoryId.setValue(1);
    status.setValue(true);
    allowComment.setValue(true);
    articleService.updateArticle(article).subscribe((data: any) => {
      expect(spy).toHaveBeenCalledWith(['/article/view']);
    });
  });

});
