import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: any;
  link: string;


  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    //this.getPost();

    //alert(this.router.url)

    this.link = this.router.url.replace('/blog/', '');
    this.getSinglePost()

  }
  ngAfterViewInit() {

  }
  getPost() {
    this.postService.getPost().subscribe(
      data => { this.post = data; console.log(this.post) }
    );
  }
  getSinglePost() {
    this.postService.getSinglePost(this.link).subscribe(
      data => { this.post = data; console.log(data) }
    );
  }
}
