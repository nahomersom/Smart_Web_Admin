import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleService } from '../Services/article.service';
import { ViewarticleComponent } from './viewarticle.component';


describe('View Article component', () => {
    let beService: ArticleService;
    let page: ViewarticleComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [ArticleService]
      });

      // inject the service
      beService = TestBed.get(ArticleService);
      page = new ViewarticleComponent(beService);

    });

    it('Should load Article items and populate Data Grid ', () => {
    const response = {
        id: 1,
        title: 'About the Company',
        body: 'This is Our First  Article',
        categoryId: 'About Us',
        language: 'English',
        defaultArticleId: 0,
        status: false,
        featured: true,
        other: []
    };

    beService.getArticles().subscribe((data: any) => {
        expect(page.articles).toBeGreaterThan(0);
    });

  });

    it('Should delete Article item', () => {
    beService.deleteArticle(1).subscribe((data: any) => {
      page.ngOnInit();
    });

  });

});
