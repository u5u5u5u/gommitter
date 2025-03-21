// 取得用
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

// 表示用
export interface DisplayCommit {
  id: number;
  message: string;
  created_at: string;
  user_id: {
    id: number;
    display_name: string;
    avatar_url: string;
  };
}
