import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  post: any;

  constructor(private http: HttpClient) { }
  // Post Operations
  selectedPost(post) {
    this.post = post;
  }
  getPost() {
    return of(this.post);
  }
  getSinglePost(link) {
    let data = { 'link': link }
    return this.http.post('https://us-central1-my-website-208e4.cloudfunctions.net/getSinglePost', data);
  }
  getPosts() {
    return this.http.get('https://us-central1-my-website-208e4.cloudfunctions.net/getPosts');
  }
  addPost(title, link, category, content, date, mainImage) {
    let data = {
      'title': title,
      'link': link,
      'category': category,
      'content': content,
      'date': date,
      'mainImage': mainImage
    }
    return this.http.post('https://us-central1-my-website-208e4.cloudfunctions.net/addPost', data);
  }
  updatePost(title, link, category, content, date, id, mainImage) {
    let data = {
      'id': id,
      'title': title,
      'link': link,
      'category': category,
      'content': content,
      'date': date,
      'mainImage': mainImage
    }
    return this.http.post('https://us-central1-my-website-208e4.cloudfunctions.net/updatePost', data);
  }
  deletePost(id) {
    return this.http.delete('https://us-central1-my-website-208e4.cloudfunctions.net/deletePost?id=' + id);
  }

  // Category Operations
  addCategory(name){
    let data = {'name': name }
    return this.http.post('https://us-central1-my-website-208e4.cloudfunctions.net/addCategory',data);
  }
  getCategories() {
    return this.http.get('https://us-central1-my-website-208e4.cloudfunctions.net/getCategories');
  }
  deleteCategory(id) {
    return this.http.delete('https://us-central1-my-website-208e4.cloudfunctions.net/deleteCategory?id=' + id);
  }
}
