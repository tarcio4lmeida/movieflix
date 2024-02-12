import { User } from "./user";

export type MovieReview = {
  id: number;
  text: string;
  movieId: string;
  user: User;
}
