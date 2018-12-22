import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(
    private postService: PostService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar) {

  }


  posts: any;
  categories: any;
  newCategory;

  ngOnInit() {
    this.spinner.show();
    this.getPosts();
    this.getCategories();
  }

  getCategories() {
    this.postService.getCategories().subscribe(
      data => { this.categories = data; console.log(data); },
      err => console.error(err),
      () => console.log('done')
    );
  }
  getPosts() {
    this.postService.getPosts().subscribe(
      data => { this.posts = data; this.spinner.hide(); console.log(data); },
      err => console.error(err),
      () => console.log('done')
    );
  }
  editPost(post) {
    this.postService.selectedPost(post);
    this.router.navigate(['/admin/edit-post']);
  }
  deleteCategoryByID(id) {
    this.spinner.show();
    this.postService.deleteCategory(id).subscribe(
      data => { 
        this.categories = data; 
        console.log(data); 
        this.spinner.hide() ;
        this.snackBar.open("Kategori Silindi", "Kapat", {
          duration: 2000,
        });
      
      },
      err => console.error(err),
      () => console.log('done')
    );
  }
  addCategory() {
    this.spinner.show();
    this.postService.addCategory(this.newCategory).subscribe(
      data => {
        this.categories = data;
        console.log(data);
        this.spinner.hide();
        this.snackBar.open("Yeni kategori eklendi", "Kapat", {
          duration: 2000,
        });
      },
      err => {
        console.error(err);
        this.spinner.hide()
        this.snackBar.open("Bu isimde kayıtlı bir kategori mevcut", "Kapat", {
          duration: 2000,
        });
      },
      () => console.log('done')
    );
  }
}
