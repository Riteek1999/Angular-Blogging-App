import { CommentModel } from "./comment.model";
export class Blog {
  constructor(public id: number, public name: string,public description: string, public writter: string ,public time: string, public like: number, public dislike: number, public comment: CommentModel[], public view: string) {}
}
