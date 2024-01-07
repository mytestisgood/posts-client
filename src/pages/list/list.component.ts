import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {select, Store} from "@ngrx/store";
import {addItem} from "../../shared/entities/items.actions";
import {Observable, tap} from "rxjs";
import {ItemsState} from "../../shared/entities/pots.models";
import {PostComponent} from "../post/post.component";
import {PostService} from "../../shared/services/post.service";
import {GetPostsResponse, Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  items$: Observable<any>; // Adjust the type based on your state structure
  private page: number = 1;
  posts: Post[]
  constructor(private store: Store<ItemsState>,
              private postService: PostService) {
    this.items$ = this.store.pipe(select(state => state.items));
  }

  ngOnInit() {
    this.fetchPosts(this.page)
    this.items$.subscribe()
  }

  addItemToStore(item: any): void {
    this.store.dispatch(addItem({item}));
  }

  fetchPosts(item: any): void {
     this.postService.getMoreItems(this.page).pipe(tap(res =>{
      this.addItemToStore(res.posts)
    })).subscribe()
    this.page ++ ;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const nextInterval = Math.ceil(scrollPosition / 800) * 800;
    if (scrollPosition >= nextInterval) {
      this.fetchPosts(this.page);
    }  }
}
