import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post : any;
  constructor(private postService : PostService) { }

  ngOnInit() {
    this.getPost();
  }
  getPost(){
    this.postService.getPost().subscribe(
      data => { this.post = data; console.log(this.post)}
    );
  }
}
