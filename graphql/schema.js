export const schema = /* GraphQL */`
type Book {
    _id: ID!
    title: String!
    description: String!
    authorId: ID!
    price: Float!
  }
  type Review {
    _id: ID!
    customerName: String!
    rating: Float!
    content: String!
    bookId: ID!
  
    book: Book!
  }
  type Author {
    _id: ID!
    name: String!
    verified: Boolean!
  
    books: [Book]
  }
  
  # Input & Edits Schemas
  input AddBookInput {
    title: String!
    description: String!
    authorId: ID!
    price: Float!
  }
  input EditBookInput {
    title: String
    description: String
    authorId: ID!
    price: Float
  }
  input AddAuthorInput {
    name: String!
    verified: Boolean!
  }
  input EditAuthorInput {
    name: String
    verified: Boolean
  }
  input AddReviewInput {
    customerName: String!
    content: String!
    rating: Float!
    bookId: String!
  }
  input EditReviewInput {
    customerName: String
    content: String
    rating: Float
    bookId: String!
  }
  
  # Query Schemas
  type Query {
    books(amount: Int): [Book]
    book(id: ID!): Book
  
    authors(amount: Int): [Author]
    author(id: ID!): Author
  
    reviews(amount: Int): [Review]
    review(id: ID!): Review
  }
  
  # Mutations Schemas
  type Mutation {
    addBook(book: AddBookInput!): Book
    deleteBook(id: ID!): Boolean
    editBook(id: ID!, book: EditBookInput!): Book
  
    addAuthor(author: AddAuthorInput!): Author
    deleteAuthor(id: ID!): Boolean
    editAuthor(id: ID!, author: EditAuthorInput!): Author
  
    addReview(review: AddReviewInput!): Review
    deleteReview(id: ID!): Boolean
    editReview(id: ID!, review: EditReviewInput!): Review
  }  
`