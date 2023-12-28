const express = require('express');
const { getAllBooks, getBookById, getAllIssuedBooks, addNewBook, deleteBookById, updatethebookbyid } = require('../controllers/book-controller');
const router = express.Router();

//Get all the books
router.get('/',getAllBooks);

// Get a single book by id
router.get('/:id',getBookById);

// Update a book
router.put('/:id',updatethebookbyid);

//Get all IssuedBook
router.get('/issuedBook',getAllIssuedBooks);

//add a new book
router.post('/',addNewBook);

//delete a book
router.delete('/',deleteBookById);

module.exports = router;