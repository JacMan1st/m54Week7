const Book = require("./model");

const addBook = async (request, response) => {
  try {
    console.log("request.body: ", request.body);
    const book = await Book.create({
      title: request.body.title,
      author: request.body.author,
      genre: request.body.genre,
    });
    console.log("book: ", book);
    response.send({ message: "success book created", book: book });
  } catch (error) {
    response.send({ message: "its buggered", error: error });
  }
};

const getAllBooks = async (request, response) => {
  const books = await Book.find({});
  response.send({ message: "got all books successfully", books: books });
};

const editAuthor = async (request, response) => {
  try {
    const title = request.body.title;
    const editAuthor = request.body.author;

    const updatedBook = await Book.findOneAndUpdate(
      { title: title },
      { $set: { author: editAuthor } },
      { new: true }
    );
    if (!updatedBook) {
      return response.status(404).send({ message: "Book not found" });
    }
    response.send({ message: "Author updated", book: updatedBook });
  } catch (error) {
    response.status(500).send({ message: "Can not update author" });
  }
};

const deleteBook = async (request, response) => {
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
};

module.exports = {
  addBook: addBook,
  getAllBooks: getAllBooks,
  editAuthor: editAuthor,
  deleteBook: deleteBook,
};
