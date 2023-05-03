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


