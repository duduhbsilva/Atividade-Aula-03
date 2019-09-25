var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var books = [];
var comments = [];
var requests = [];
var addItensCart = [];

/*======================================================================

Comments

======================================================================*/

// Get all comments
app.get('/v1/public/comments', function(req, res) {
	res.status(200).send(JSON.stringify(comments));
});

// Get comment by book
app.get('/v1/public/comments/:bookId', function(req, res) {
	var commentsByBook = [];
	for(var i = 0; i < comments.length; i++){
		if(req.params.bookId == comments[i].book.id){
			commentsByBook.push(comments[i]);
		}
	}
	res.status(200).send(JSON.stringify(commentsByBook));
});

// Register comment by book
app.post('/v1/public/comments/:bookId', function(req, res) {
	var comment = req.body;
	for(var i = 0; i < books.length; i++){
		if(req.params.bookId == books[i].id){
			comment.book = books[i];
			break;
		}
	}
	comments.push(comment);
	res.status(201).send(JSON.stringify(comment));
});

// Get comment by id
app.get('/v1/public/comments/:id', function(req, res) {
	var selectedReview = {};
	for(var i = 0; i < comments.length; i++){
		if(req.params.id == comments[i].id){
			selectedReview = comments[i];
			break;
		}
	}
	res.status(200).send(JSON.stringify(selectedReview));
});

// Edit comment
app.put('/v1/public/comments/:id', function(req, res) {
	var updateReview = {};
	for(var i = 0; i < comments.length; i++){
		if(req.params.id == comments[i].id){
			updateReview = comments[i];		
			break;
		}
	}
	updateReview.content = req.body;
	res.status(200).send(JSON.stringify(updateReview));
});

// Delete comment
app.delete('/v1/public/comments/:id', function(req, res) {
	var index;
	for(var i = 0; i < comments.length; i++){
		if(req.params.id == comments[i].id){
			index = i;		
			break;
		}
	}
	comments.splice(index, 1);
	res.status(200);
});

/*======================================================================

Books

======================================================================*/

// Get books by criteria
app.get('/v1/public/books/:search', function(req, res) {
	var filteredBooks = [];
	for(var i = 0; i < books.length; i++){
		if(books[i].title.indexOf(req.params.search) != -1){
			filteredBooks.push(books[i]);
		}
	}
	res.status(200).send(JSON.stringify(filteredBooks));
});

// Get all books
app.get('/v1/public/books', function(req, res) {
	res.status(200).send(JSON.stringify(books));
});

// Register book
app.post('/v1/public/books', function(req, res) {
	books.push(req.body);
	res.status(201).send(JSON.stringify(req.body));
});

// Get book by id
app.get('/v1/public/books/:id', function(req, res) {
	var selectedBook = {};
	for(var i = 0; i < books.length; i++){
		if(req.params.id == books[i].id){
			selectedBook.push(books[i]);
			break;
		}
	}
	res.status(200).send(JSON.stringify(selectedBook));
});

// Edit book
app.put('/v1/public/books/:id', function(req, res) {
	var updateBook = {};
	for(var i = 0; i < books.length; i++){
		if(req.params.id == books[i].id){
			updateBook = books[i];
			break;
		}
	}
	updateBook = req.body;
	res.status(200).send(JSON.stringify(updateBook));
});

// Delete book
app.delete('/v1/public/books/:id', function(req, res) {
	var index;
	for(var i = 0; i < books.length; i++){
		if(req.params.id == books[i].id){
			index = i;
			break;
		}
	}
	books.splice(index, 1);
	res.status(200);
});

/*======================================================================

Requests

======================================================================*/

// Get all requests
app.get('/v1/public/requests', function(req, res) {
	res.status(200).send(JSON.stringify(requests));
});

// Register request
app.post('/v1/public/requests/:bookId', function(req, res) {
	var request = req.body;
	for(var i = 0; i < books.length; i++){
		if(req.params.bookId == books[i].id){
			request.book = books[i];
			break;
		}
	}
	requests.push(request);
	res.status(201).send(JSON.stringify(request));
});

// Get request by id
app.get('/v1/public/requests/:id', function(req, res) {
	var selectedRequest = {};
	for(var i = 0; i < requests.length; i++){
		if(req.params.id == requests[i].id){
			selectedRequest.push(requests[i]);
			break;
		}
	}
	res.status(200).send(JSON.stringify(selectedRequest));
});

// Edit request
app.put('/v1/public/requests/:id', function(req, res) {
	var updateRequest = {};
	for(var i = 0; i < requests.length; i++){
		if(req.params.id == requests[i].id){
			updateRequest = requests[i];
			break;
		}
	}
	updateRequest = req.body;
	res.status(200).send(JSON.stringify(updateRequest));
});

// Delete request
app.delete('/v1/public/requests/:id', function(req, res) {
	var index;
	for(var i = 0; i < requests.length; i++){
		if(req.params.id == requests[i].id){
			index = i;
			break;
		}
	}
	requests.splice(index, 1);
	res.status(200);
});

/*======================================================================

Tracking the status of deliveries made

======================================================================*/

// Get request by id
app.get('/v1/public/deliveries/:requestId', function(req, res) {
	var currentStatus = '';
	for(var i = 0; i < requests.length; i++){
		if(req.params.requestId == requests[i].id){
			requests[i].currentStatus;
			break;
		}
	}
	res.status(200).send(JSON.stringify(currentStatus));
});

/*======================================================================

Handle shopping cart

======================================================================*/

// insert item in shopping cart
app.post('/v1/public/shoppingCart', function(req, res) {
	res.status(200).send(JSON.stringify(addItensCart));
});

/*======================================================================

Listen

======================================================================*/

app.listen(8080, function() {
	console.log('Servidor rodando na porta 8080.');
});