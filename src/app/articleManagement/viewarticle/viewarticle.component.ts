import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../Services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.css']
})
export class ViewarticleComponent implements OnInit {

  public articles: any;
   public article = 'article';
   public columensToDisplay: any[] = [];
  public searchField = 'title';
  public incomingToolbar = [{ text: 'Add', tooltipText: 'Add Items'}, { text: 'Search', tooltipText: 'Search Items'}];
  public incomingCommand = {edit: true, delete: true};
  constructor(private articleService: ArticleService, private router?: Router) {
    this.columensToDisplay.push({ field: 'title' , headerText: 'Title Of Article' , textAlign: 'left', width: 140,
    clipMode: 'EllipsisWithTooltip' });
    this.columensToDisplay.push({ field: 'categoryId' , headerText: 'Category' , textAlign: 'left', width: 60 });
    this.columensToDisplay.push({ field: 'status' , headerText: 'Disabled' , textAlign: 'left', width: 40 ,
     displayAsCheckBox: 'true' });
    this.columensToDisplay.push({ field: 'featured' , headerText: 'Featured' , textAlign: 'left', width: 40 ,
     displayAsCheckBox: 'true' });
    this.columensToDisplay.push({ field: 'allowComment' , headerText: 'Commenting' , textAlign: 'left', width: 50 ,
     displayAsCheckBox: 'true' });
  }

  ngOnInit() {
    this.articleService.getArticles()
    .subscribe((data: any[]) => {
      this.articles = data;
    });
  }

  deleteArticle(item: any) {
    this.articleService.deleteArticle(item)
    .subscribe((response: any) => {
      if (response.status) {
        this.ngOnInit();
      }

    });
  }

  addNewArticle() {
    this.router.navigate(['dashboard/article/new']);
  }


}
