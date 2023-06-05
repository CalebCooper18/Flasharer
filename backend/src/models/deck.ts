import mongoose, { Schema, Types, Document } from 'mongoose';
import { ICard, cardSchema } from './card';

export interface IDeck {
  topic: string;
  likedBy: Types.ObjectId[];
  likes: number;
  cards: ICard[];
  tags: string[];
  createdBy: Types.ObjectId;
  shared: boolean;
}

export interface IDeckDocument extends IDeck, Document {}

const deckSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: {
    type: Number,
    default: 0,
  },
  cards: [cardSchema],
  tags: [
    {
      type: String,
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shared: {
    type: Boolean,
    required: true,
    default: true,
  },
});

deckSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Deck = mongoose.model<IDeckDocument>('Deck', deckSchema);

export default Deck;
