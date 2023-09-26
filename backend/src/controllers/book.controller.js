import BookServices from "../services/book.services.js";

const bookServices = new BookServices();

export const createBook = async (req, res) => {
  try {
    const book = req.body;

    const { title, author, publishYear } = book;

    if (!title || !author || !publishYear) {
      return req.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const create = await bookServices.createBook(book);

    if (!create) {
      return req
        .status(500)
        .send({ message: "Internal error creating the book" });
    }

    return res.status(200).send({ message: "Book created", book: create });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await bookServices.getBoooks();

    if (!books) {
      return res.status(500).json({ message: "Internal error" });
    }

    return res
      .status(200)
      .json({ message: "All books", counter: books.length, books: books });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await bookServices.getBookById(bookId);

    if (!book) {
      return res
        .status(500)
        .json({ message: `Book with ID ${bookId} does not exist` });
    }

    return res.status(200).json({
      message: "Book by Id",
      book: book,
    });
  } catch (error) {
    console.log("🚀 ~ file: book.controller.js:51 ~ getBook ~ error:", error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const information = req.body;
    const { bookId } = req.params;

    const updateIt = await bookServices.updateBookId(
      { _id: bookId },
      information
    );
    if (!updateIt) {
      return req.response(500).json({ message: "Internal error" });
    }

    return res.status(200).json({
      message: `Book has been updated`,
      book: updateIt,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: book.controller.js:79 ~ updateBook ~ error:",
      error
    );
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const deleteBook = await bookServices.deleteBookById(bookId);

    if (!deleteBook) {
      return res.stauts(500).json({ message: "Internal error deleting book" });
    }

    res.status(200).json({
      message: "Book deleted",
      book: deleteBook,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: book.controller.js:107 ~ deleteBookById ~ error:",
      error
    );
    req.status(500).json({ message: "Internal error", error: error.message });
  }
};
