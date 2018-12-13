import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: any;
  link: string;


  constructor(private postService: PostService, 
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.link = this.router.url.replace('/blog/', '');
    this.getSinglePost()
  }
  ngAfterViewInit() {

  }
  getSinglePost() {
    this.postService.getSinglePost(this.link).subscribe(
      data => { 
        this.post = data; 
        this.spinner.hide();
        console.log(data) 
      }
    );
  }
}
