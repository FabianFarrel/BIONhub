export type ContentType = 'movie' | 'tv' | 'music';

export interface Review {
  _id: string;
  user: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export interface Content {
  _id: string;
  title: string;
  type: ContentType;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  genres: string[];
  releaseYear?: number;
  creator: string;
  runtime: string;
  averageRating: number;
  reviews?: Review[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  favorites: Array<string | Content>;
}

export interface AuthResponse {
  token: string;
  user: User;
}
