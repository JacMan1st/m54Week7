require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connection is working");
};
connection();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

const logTypeOfResult = async (result) => {
  console.log(`Typeof result: ${typeof result} - result: ${result}`);
};

app.post("/books/addBook", async (request, response) => {
  const book = await Book.create({
    title: request.body.title,
    author: "Emily Bronte",
    genre: "epic tradgey",
  });
  console.log("book", book);
  response.send({ message: "book created", book: book });
});

app.get("/books/getAllBooks", async (request, response) => {
  const books = await Book.find({});
  response.send({ message: "got all books successfully", books: books });
});

app.put("/books/editAuthor", async (request, response) => {
  try {
    const title = request.body.title;
    const editAuthor = request.body.author;

    const updatedBook = await Book.findOneAndUpdate(
      { title: title },
      { $set: { author: editAuthor } },
      { new: true }
    );

    if (!updatedBook) {
      return response.status(404).send({ message: "Error: Book not found" });
    }

    response.send({ message: "Success: Author updated", book: updatedBook });
  } catch (error) {
    response.status(500).send({ message: "Error: Unable to update author" });
  }
});

app.delete("/books/deleteBook", async (request, response) => {
  try {
    const deleteBook = await Book.findOneAndDelete({
      title: request.body.title,
    });
    return response
      .status(200)
      .json({ message: "deleted success", data: deleteBook });
  } catch (error) {
    return response.status(400).json({ message: "Error: Unable to delete" });
  }
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
