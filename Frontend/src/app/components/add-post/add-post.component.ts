import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  blogTitle: string;
  blogLink: string;
  mainImage: string = "";


  categories: any;
  selectedCategory: string;

  constructor(
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.mycontent = `<p>Blog Yazısı</p>`;
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true
    };
    this.getCategories();
  }

  addNewPost() {
    this.spinner.show();
    this.postService.addPost(this.blogTitle, 
                             this.blogLink, 
                             this.selectedCategory, 
                             this.mycontent, 
                             new Date().toLocaleDateString(), 
                             this.mainImage).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/admin'])
        this.spinner.hide();
        this.snackBar.open("Yeni yazı eklendi !", "Kapat", {
          duration: 2000,
        });
      },
      err => console.error(err),
      () => console.log('done'))

  }
  getCategories() {
    this.spinner.show();
    this.postService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(data);
        this.selectedCategory = this.categories[0].name;
        this.spinner.hide();
      },
      err => console.error(err),
      () => console.log('done')
    );
  }

}
