import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(
    private postService : PostService, 
    private router:  Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  blogTitle: string;
  blogLink: string;
  selectedCategory: string;
  mainImage: string = "";

  post: any;
  postID: any;

  categories: any;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postID = params;
   });

    this.getPost();
    this.getCategories();  
  }
  getPost(){
    this.postService.getSinglePostByID(this.postID.id).subscribe(
      data => { 
        this.post = data; 
        console.log(this.post);

        this.blogTitle = this.post.title;
        this.blogLink = this.post.link;
        this.mainImage = this.post.mainImage;
        this.selectedCategory = this.post.category;
        this.mycontent = this.post.content;
      }
    );
  }
  updatePost(){
    this.spinner.show();
    this.postService.updatePost(this.blogTitle,
                                this.blogLink,
                                this.selectedCategory,
                                this.mycontent,
                                this.post.date,
                                this.post.id,
                                this.mainImage).subscribe(
      data=> { 
        console.log(data);
        this.router.navigate(['/admin']);
        this.spinner.hide();
      },
      err => console.error(err),
      () => console.log('done'))
  }
  deletePost(){
    this.spinner.show(); 
    this.postService.deletePost(this.post.id).subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin'])
      this.spinner.hide();
    })
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
