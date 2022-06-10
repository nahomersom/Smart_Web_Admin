import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CataService } from 'src/app/categoryManagement/cata.service';
import { ViewcategoryComponent } from './viewcategory.component';


describe('View Categories component', () => {
    let cataService: CataService;

    let page: ViewcategoryComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [CataService]
      });
      page = new ViewcategoryComponent(cataService);

      // inject the service
      cataService = TestBed.get(CataService);
    });

    it('Should load category items and populate Data Grid ', () => {
    const response = {
      id: 1,
      title: 'Category 2',
      desc: 'This is the First Category',
      language: 'English',
      defaultCatagoryId: 0,
      status: true,
      other: []
    };

    cataService.getcategories().subscribe((data: any) => {
        expect(page.catagories).toBeGreaterThan(0);
    });

  });


    it('Should delete category item', () => {
    cataService.deletecategory(1).subscribe((data: any) => {
      page.ngOnInit();
    });

  });

});
