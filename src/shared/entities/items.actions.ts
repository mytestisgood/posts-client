// items.actions.ts
import { createAction, props } from '@ngrx/store';
import {GetPostsResponse, Post} from "../models/post.model";

export const addItem = createAction('Add Item', props<{ item: any }>());
