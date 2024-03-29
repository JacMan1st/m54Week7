const { Router } = require("express");
const bookRouter = Router();

const Book = require("./model");

const { addBook } = require("./controllers");
const { getAllBooks } = require("./controllers");
const { editAuthor } = require("./controllers");
const { deleteBook } = require("./controllers");
const { deleteAllBooks } = require("./controllers");
const { getFirstBook } = require("./controllers");

bookRouter.post("/books/addBook", addBook);
bookRouter.get("/books/getAllBooks", getAllBooks);
bookRouter.put("/books/editAuthor", editAuthor);
bookRouter.delete("/books/deleteBook", deleteBook);
bookRouter.delete("/books/deleteAllBooks", deleteAllBooks);
bookRouter.get("/books/getFirstBook", getFirstBook);

module.exports = bookRouter;
