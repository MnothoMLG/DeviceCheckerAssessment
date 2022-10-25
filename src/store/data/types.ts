export interface DataState {
  posts: IEntry<IRedditPost, string>[];
  sort: ISort;
  after: string;
}

export type ISort = 'Hot' | 'Top' | 'New' | 'Rising';
export interface IEntry<T, A> {
  data: T;
  kind: A;
}
export interface IRedditPost {
  author: string;
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  title: string;
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  //left out the other fields I won't be using
}

export interface ISuccessPayload {
  posts: IEntry<IRedditPost, string>[];
  after: string;
}

export interface IFetchPayload {
  sort: ISort;
  after?: string;
}

export interface IResponse {
  dist: number;
  geo_filter?: string;
  after: string;
  before?: string;
  children: IEntry<IRedditPost, string>[];
}
