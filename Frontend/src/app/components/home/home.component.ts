import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService : PostService,private spinner: NgxSpinnerService) { }

  posts: any;

  ngOnInit() {
    this.spinner.show();
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe(
      data => { 
        this.posts = data; 
        this.spinner.hide(); 
        console.log(data); 

        // Yazıları tarihe gore sıralama
        this.posts = this.postService.sortPosts(this.posts);
      },
      err => console.error(err),
      () => console.log('done')
    );
  }
}
