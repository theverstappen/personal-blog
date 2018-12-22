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
 
    // setTimeout(() => {
    //     /** spinner ends after 5 seconds */
        
    // }, 600);

    this.getPosts();

    //alert(new Date().toLocaleDateString())
  }

  getPosts(){
    this.postService.getPosts().subscribe(
      data => { 
        this.posts = data; 
        this.spinner.hide(); 
        console.log(data); 

        // Yazıları tarihe gore sıralama
        this.posts.sort((a,b) => {
          a = a.date.split('.').reverse().join('');
          b = b.date.split('.').reverse().join('');
          //return a < b ? 1 : a > b ? -1 : 0;
          return b.localeCompare(a);         // <-- alternative 
        });
      },
      err => console.error(err),
      () => console.log('done')
    );
  }
}
