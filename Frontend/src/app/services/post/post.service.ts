import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  post: any;

  constructor(private http: HttpClient) { }
  selectedPost(post){
    this.post = post;
  }
  getPost(){
    return of(this.post);
  }
  getPosts(){
    return this.http.get('https://us-central1-my-website-208e4.cloudfunctions.net/getPosts');
  }
  addPost(title, category, content, date){
    let data = {
      'title': title,
      'category':category, 
      'content': content, 
      'date': date
    }
    return this.http.post('https://us-central1-my-website-208e4.cloudfunctions.net/addPost',data);
  }
  updatePost(title, category, content, date,id){
    let data = {
      'id': id,
      'title': title,
      'category':category, 
      'content': content, 
      'date': date
    }
    return this.http.post('https://us-central1-my-website-208e4.cloudfunctions.net/updatePost',data);
  }
}
