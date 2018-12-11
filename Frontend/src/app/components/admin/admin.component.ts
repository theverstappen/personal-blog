import { Component, OnInit, ElementRef,ViewChild  } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(private postService : PostService, private router: Router) { 
    
  }


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
  editPost(post){

    this.postService.selectedPost(post);
    this.router.navigate(['/admin/edit-post']);
  }
}
