// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    res.render('books/details', {
      title: 'Add/Edit Books',
      books: {}
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  book.insertMany(req.body)
    .then(result => {
      res.redirect('/books');
    })
    .catch(err => console.log(err))
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    if(id) {
      book.findById(id).then(result => {
        res.render('books/details', {
          title: 'Add/Edit Books',
          books: result
        });
      })
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    const { id } = req.params;

    if(id) {
      book.findByIdAndUpdate(id, req.body).then(result => {
        res.redirect('/books');
      })
    }

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    const { id } = req.params;

    if(id) {
      book.findByIdAndDelete(id).then(result => {
        res.redirect('/books');
      })
    }
});


module.exports = router;
