const express = require('express');
const app = express();
const path = require('path');
const method = require('method-override');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(method('_method'));//to us post and delets requests in forms
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//fake data Array of comments
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: '101 that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new'); //render the new.ejs file
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params; //get the id from the url
    const comment = comments.find(c => c.id === id); //get the comment from the comments array using the id
    res.render('comments/show', { comment }); //render the show.ejs file
});

app.get('/comments/:id/edit', (req, res) => {  
    const { id } = req.params; //get the id from the url
    const comment = comments.find(c => c.id === id); //get the comment from the comments array using the id
    res.render('comments/edit', { comment }); //render the edit.ejs file
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params; //get the id from the url
    const newCommentText = req.body.comment; //get the new comment text from the form
    const foundComment = comments.find(c => c.id === id); //find the comment in the comments array using the id
    foundComment.comment = newCommentText; //update the comment text
    res.redirect('/comments'); //redirect back to index page
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params; //get the id from the url
    comments = comments.filter(c => c.id !== id); //filter out the comment with the id that matches the id from the url
    res.redirect('/comments'); //redirect back to index page
});

app.post('/comments', (req, res) => {
    //console.log(req.body); //req.body is the data from the form

    const { username, comment } = req.body; //destructure the username and comment from the form
    comments.push({ username, comment,id : uuid()}); //push the username and comment into the comments array

    //res.send('IT WORKED!'); //redirect to the comments page

    res.redirect('/comments'); //redirect to the comments page
})



app.listen(3000, () => {
    console.log("ON PORT 3000!")
})