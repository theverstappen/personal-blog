import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(private postService : PostService, private router:  Router) { }
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  blogTitle: string;
  blogCategory: string;


  post: any;
  ngOnInit() {
    this.getPost();
    this.blogTitle = this.post.title;
    this.blogCategory = this.post.title;
    this.mycontent = this.post.content;
  }
  getPost(){
    this.postService.getPost().subscribe(
      data => { this.post = data; console.log(this.post)}
    );
  }
  onChange($event: any): void {
    console.log(this.mycontent);
    //this.log += new Date() + "<br />";
  }
  updatePost(blogTitle,blogCategory,mycontent){
    this.postService.updatePost(blogTitle,blogCategory,mycontent,'22.10.2019',this.post.id).subscribe(
      data=> { console.log(data); this.router.navigate(['/admin'])},
      err => console.error(err),
      () => console.log('done'))
  }
}
