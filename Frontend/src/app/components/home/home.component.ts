import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService : PostService) { }

  posts: any;

  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe(
      data => { this.posts = data; console.log(data); },
      err => console.error(err),
      () => console.log('done')
    );
  }
  setPost(post){
    this.postService.selectedPost(post);
  }
}
