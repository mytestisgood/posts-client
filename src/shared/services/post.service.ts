import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments";
import {GetPostsResponse} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://127.0.0.1:8000/api/'
  constructor(private http: HttpClient) {}

  getMoreItems(page: number): Observable<GetPostsResponse> {
    // Adjust the API endpoint and parameters based on your server implementation
    return this.http.get<GetPostsResponse>(`${environment.apiUrl}posts?page=${page}`);
  }
}
