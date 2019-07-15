export interface IComment {
  _id: string;
  user: string;
  blog: string;
  content: string;
  reply_comment_id: string;
}

export interface ICommentInputDTO {
  blog_id: string;
  content: string;
  reply_comment_id: string
}
