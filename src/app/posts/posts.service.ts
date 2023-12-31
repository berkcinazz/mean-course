import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts:Post[], postCount:number}>();
  backendUrl = environment.backendUrl + '/posts/';
  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http
      .get<{ message: string; posts: Post[], maxPosts :number }>(
        this.backendUrl + queryParams
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next({posts : [...this.posts], postCount : postData.maxPosts});
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        this.backendUrl,
        postData
      )
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData ;
    if(typeof(image) === 'object') {
      postData = new FormData();
      postData.append('_id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    }
    else {
      postData = {
        _id: id,
        title: title,
        content: content,
        imagePath: image.toString(),
        creator:null
      }
    }
    this.http
      .put(this.backendUrl + id, postData)
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath:string, creator:string }>(
      this.backendUrl + id
    );
  }

  deletePost(id: string) {
    return this.http.delete(this.backendUrl + id)
  }
}
