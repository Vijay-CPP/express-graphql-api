import { Schema, model } from "mongoose";

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
});

export const Author = new model("Author", authorSchema); 