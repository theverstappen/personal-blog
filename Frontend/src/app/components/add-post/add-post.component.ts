import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
  blogLink: string;
  mainImage: string = "";

  
  categories = [
    {id: 1, name: "Fitness"},
    {id: 2, name: "Beslenme"},
    {id: 3, name: "Muzik"}
  ];
  selectedCategory = this.categories[0]
  constructor(
    private postService : PostService,
    private spinner: NgxSpinnerService,
    private router : Router) {
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
  addNewPost(blogTitle,blogLink,blogCategory,mycontent,mainImage){
    console.log(this.selectedCategory.name);
    /*
    this.spinner.show();
    this.postService.addPost(blogTitle,blogLink,blogCategory,mycontent,new Date().toLocaleDateString(),mainImage).subscribe(
      data=> { 
        console.log(data); 
        this.router.navigate(['/admin'])
        this.spinner.hide();
      },
      err => console.error(err),
      () => console.log('done'))
      */
  }
  
}
