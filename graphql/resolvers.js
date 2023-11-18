import { Book } from "../models/book.js"
import { Author } from "../models/author.js"
import { Review } from "../models/review.js"

export const resolvers = {
    Query: {
        book: async (parent, args, context, info) => {
            const { id } = args;
            const res = await Book.findById(id);
            return res;
        },
        books: async (parent, args, context, info) => {
            const { amount } = args;
            return await Book.find().limit(amount);
        },

        author: async (parent, args, context, info) => {
            const { id } = args;
            const res = await Author.findById(id);
            return res;
        },
        authors: async (parent, args, context, info) => {
            const { amount } = args;
            return await Author.find().limit(amount);
        },

        review: async (parent, args, context, info) => {
            const { id } = args;
            const res = await Review.findById(id);
            return res;
        },
        reviews: async (parent, args, context, info) => {
            const { amount } = args;
            return await Review.find().limit(amount);
        }
    },
    Mutation: {
        addBook: async (parent, args, context, info) => {
            const { book: bookInput } = args;
            const newBook = new Book(bookInput);
            const res = await newBook.save();
            return res;
        },
        deleteBook: async (parent, args, context, info) => {
            const { id } = args;
            const { deletedCount } = await Book.deleteOne({ _id: id });
            return deletedCount === 1;
        },
        editBook: async (parent, args, context, info) => {
            const { id, book: bookInput } = args;
            const { modifiedCount } = await Book.updateOne({ _id: id }, bookInput);
            const res = await Book.findById(id);
            return res;
        },


        addAuthor: async (parent, args, context, info) => {
            const { author: authorInput } = args;
            const newAuthor = new Author(authorInput);
            const res = await newAuthor.save();
            return res;
        },
        deleteAuthor: async (parent, args, context, info) => {
            const { id } = args;
            const { deletedCount } = await Author.deleteOne({ _id: id });
            return deletedCount === 1;
        },
        editAuthor: async (parent, args, context, info) => {
            const { id, author: authorInput } = args;
            const { modifiedCount } = await Author.updateOne({ _id: id }, authorInput);
            const res = await Author.findById(id);
            return res;
        },


        addReview: async (parent, args, context, info) => {
            const { review: reviewInput } = args;
            const newReview = new Review(reviewInput);
            const res = await newReview.save();
            return res;
        },
        deleteReview: async (parent, args, context, info) => {
            const { id } = args;
            const { deletedCount } = await Review.deleteOne({ _id: id });
            return deletedCount === 1;
        },
        editReview: async (parent, args, context, info) => {
            const { id, review: reviewInput } = args;
            const { modifiedCount } = await Review.updateOne({ _id: id }, reviewInput);
            const res = await Review.findById(id);
            return res;
        },
    },
    Review: {
        book: async (parent, args, context, info) => {
            return await Book.findById(parent.bookId);
        }
    },
    Author: {
        books: async (parent, args, context, info) => {
            const res = await Book.find({ authorId: parent._id.toString()}).exec();
            return res
        }
    }
}