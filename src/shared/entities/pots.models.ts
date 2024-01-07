// items.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addItem } from './items.actions';
import {Post} from "../models/post.model";

export interface ItemsState {
  items: any[];
}

export const initialState: ItemsState = {
  items: [],
};

export const itemsReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => ({ ...state, ...state.items, ...item }))
);
