// types/api/comments.types.ts
export type Comment = {
  _id: string;
  content: string;
  blog: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};
