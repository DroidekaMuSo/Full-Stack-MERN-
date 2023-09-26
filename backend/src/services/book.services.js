import bookModel from "../models/book.model.js";

export default class BookServices {
  createBook = async (book) => {
    try {
      const create = await bookModel.create(book);

      if (!create) {
        return null;
      }

      return create;
    } catch (error) {
      console.log(
        "🚀 ~ file: book.services.js:9 ~ BookServices ~ createBook=async ~ error:",
        error
      );
    }
  };

  getBoooks = async () => {
    try {
      const books = await bookModel.find({}).lean();

      if (!books) return null;

      return books;
    } catch (error) {
      console.log(
        "🚀 ~ file: book.services.js:25 ~ BookServices ~ getBoooks=async ~ error:",
        error
      );
    }
  };

  getBookById = async (bookId) => {
    try {
      const book = await bookModel.findById({ _id: bookId });

      if (!book) return null;

      return book;
    } catch (error) {
      console.log(
        "🚀 ~ file: book.services.js:41 ~ BookServices ~ getBookById=async ~ error:",
        error
      );
      return null;
    }
  };

  updateBookId = async (bookId, information) => {
    try {
      const updateBook = await bookModel.updateOne(
        { _id: bookId },
        information
      );

      if (!updateBook) return null;

      return updateBook;
    } catch (error) {
      console.log(
        "🚀 ~ file: book.services.js:56 ~ BookServices ~ updateBookId=async ~ error:",
        error
      );
    }
  };

  deleteBookById = async (bookId) => {
    try {
        const deleteIt = await bookModel.deleteOne({_id:bookId})

        if(!deleteIt){
            return null
        }

        return deleteIt
    } catch (error) {
      console.log(
        "🚀 ~ file: book.services.js:74 ~ BookServices ~ deleteBookById ~ error:",
        error
      );
    }
  };
}
