export interface IBlog {
  _id: string;
  title: string;
  meta: {
    view: Number,
    like: Number,
  };
  desc: string;
  content: string;
  author_id: string;
}

export interface IBlogInputDTO {
  title: string;
  desc: string;
  content: string;
}

export interface IBlogUpdateDTO {
  _id: string;
  user_id: string;
  content: string;
}
