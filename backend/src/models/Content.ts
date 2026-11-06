import mongoose, { Schema, Document, Types, Model } from 'mongoose';

export type ContentType = 'movie' | 'tv' | 'music';

export interface IReview {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContent extends Document {
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
  reviews: Types.DocumentArray<IReview>;
  recalculateRating(): void;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, trim: true, maxlength: 1000, default: '' },
  },
  { timestamps: true }
);

const contentSchema = new Schema<IContent>(
  {
    title: { type: String, required: true, trim: true, index: true },
    type: { type: String, required: true, enum: ['movie', 'tv', 'music'], index: true },
    overview: { type: String, default: '' },
    posterUrl: { type: String, default: '' },
    backdropUrl: { type: String, default: '' },
    trailerUrl: { type: String, default: '' },
    genres: [{ type: String }],
    releaseYear: { type: Number },
    creator: { type: String, default: '' },
    runtime: { type: String, default: '' },
    averageRating: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

// Text index to support searching by title / overview / creator.
contentSchema.index({ title: 'text', overview: 'text', creator: 'text' });

// Recalculate averageRating from the embedded reviews.
contentSchema.methods.recalculateRating = function recalculateRating(): void {
  if (!this.reviews.length) {
    this.averageRating = 0;
    return;
  }
  const sum = this.reviews.reduce((acc: number, r: IReview) => acc + r.rating, 0);
  this.averageRating = Math.round((sum / this.reviews.length) * 10) / 10;
};

const Content: Model<IContent> = mongoose.model<IContent>('Content', contentSchema);
export default Content;
