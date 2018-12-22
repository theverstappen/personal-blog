import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(
    private postService : PostService, 
    private router:  Router,
    private spinner: NgxSpinnerService) { }

  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  blogTitle: string;
  blogLink: string;
  blogCategory: string;
  mainImage: string = "";



  post: any;
  ngOnInit() {
    this.getPost();
  
  }
  getPost(){
    this.postService.getPost().subscribe(
      data => { 
        this.post = data; 
        console.log(this.post);

        this.blogTitle = this.post.title;
        this.blogLink = this.post.link;
        this.mainImage = this.post.mainImage;
        this.blogCategory = this.post.title;
        this.mycontent = this.post.content;
      }
    );
  }
  onChange($event: any): void {
    console.log(this.mycontent);
    //this.log += new Date() + "<br />";
  }
  updatePost(blogTitle,blogLink,blogCategory,mycontent,mainImage){
    this.spinner.show();
    this.postService.updatePost(blogTitle,blogLink,blogCategory,mycontent,this.post.date,this.post.id,mainImage).subscribe(
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
}
