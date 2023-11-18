import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    bookId: {
        type: String,
        required: true
    }
});

export const Review = new model("Review", reviewSchema); 