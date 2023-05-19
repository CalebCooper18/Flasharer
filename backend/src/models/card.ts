import { Schema } from "mongoose";

export interface ICard {
    subject: string;
    answer: string;
}

export const cardSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

cardSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
         returnedObject.id = returnedObject._id.toString();
         delete returnedObject._id;
         delete returnedObject.__v;
    } 
});


