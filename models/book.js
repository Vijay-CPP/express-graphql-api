import mongoose, { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export const Book = new model("Book", bookSchema); 