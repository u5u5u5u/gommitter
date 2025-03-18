//
export interface Commit {
  id: number;
  message: string;
  date: string;
}

// 投稿用
export interface PostCommit {
  id: number;
  user_id: number;
  message: string;
}
