import { Router } from "express";
import {
  createBook,
  deleteBookById,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";

const router = Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:bookId", getBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBookById);

export default router;
