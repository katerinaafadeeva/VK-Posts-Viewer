export type Post = {
  id: number;
  text: string;
  date: number;
  views: { count: number };
  likes: { count: number };
  reposts: { count: number };
};
export type PostTableProps = {
  post: Post;
};


