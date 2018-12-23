import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  post: any;

  constructor(private http: HttpClient) { }
  // Post Operations

  getSinglePostByLink(link) {
    let data = { 'link': link }
    return this.http.post(environment.api.getSinglePostByLink, data);
  }
  getSinglePostByID(id) {
    let data = { 'id': id }
    return this.http.post(environment.api.getSinglePostByID, data);
  }
  getPosts() {
    return this.http.get(environment.api.getPosts);
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
    return this.http.post(environment.api.addpost, data);
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
    return this.http.post(environment.api.updatePost, data);
  }
  deletePost(id) {
    return this.http.delete(environment.api.deletePost + id);
  }
  sortPosts(posts){
    return posts.sort((a,b) => {
      a = a.date.split('.').reverse().join('');
      b = b.date.split('.').reverse().join('');
      return b.localeCompare(a);
    });
  }

  // Category Operations
  addCategory(name){
    let data = {'name': name }
    return this.http.post(environment.api.addCategory,data);
  }
  getCategories() {
    return this.http.get(environment.api.getCategories);
  }
  deleteCategory(id) {
    return this.http.delete(environment.api.deleteCategory + id);
  }
}
