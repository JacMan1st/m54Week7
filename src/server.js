const express = require("express");
const { request } = require("http");

const app = express();

// HTTP verbs - GET, POST, PUT, DELETE

const fakeArr = [];

app.use(express.json());

// HTTP verb GET
app.get("/books", (request, responce) => {
  responce.send({ message: "success", fakeArr: fakeArr });
});

app.get("/books/getfirstbook", (request, response) => {
  console.log("/books/getfirstbook: ", request.path);
  const book = fakeArr[0];
  response.send({ message: "got first book", book: book });
});

app.post("/books", (request, response) => {
  const newBook = {
    id: book_id++,
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
  };
  fakeArr.push(newBook);
  console.log(fakeArr);
  const successResponse = {
    message: "Book successfully added",
    addedBook: newBook,
  };
  response.send(successResponse);
});

app.put("/books/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const { title, author, genre } = request.body;

  const index = fakeArr.findIndex((book) => book.id === id);
  if (index !== -1) {
    fakeArr[index] = { id, title, author, genre };
    response.send({
      message: "Book updated successfully",
      updatedBook: fakeArr[index],
    });
  } else {
    response.status(404).send({ message: "Book not found" });
  }
});

app.delete("/books/:id", (request, response) => {
  const id = parseInt(request.params.id);

  const index = fakeArr.findIndex((book) => book.id === id);
  if (index !== -1) {
    const deletedBook = fakeArr.splice(index, 1)[0];
    response.send({
      message: "Book deleted successfully",
      deletedBook: deletedBook,
    });
  } else {
    response.status(404).send({ message: "Book not found" });
  }
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
