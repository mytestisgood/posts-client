export interface GetPostsResponse {
  posts: Post[]
}

export interface Post {
  tags?: [],
  date?: string,
  content?: string,
  userEmail?: string,
  userName?: string,
  _id?: string,
}
