import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  blogTitle: string;
  blogCategory: string;


  constructor(private postService : PostService) {
    this.mycontent = `<p>Blog Yazısı</p>`;
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,  
      forcePasteAsPlainText: true
    };
  }

  onChange($event: any): void {
    console.log(this.mycontent);
    //this.log += new Date() + "<br />";
  }
  addNewPost(blogTitle,blogCategory,mycontent){
    console.log(blogTitle,blogCategory,mycontent);
    this.postService.addPost(blogTitle,blogCategory,mycontent,'22.10.2019').subscribe(
      data=> { console.log(data); },
      err => console.error(err),
      () => console.log('done'))
  }
}
