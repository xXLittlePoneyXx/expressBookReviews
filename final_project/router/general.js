const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)})
    
    myPromise.then((successMessage) => {
        return res.status(200).json(JSON.stringify(books));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)})
    
    myPromise.then((successMessage) => {
        let isbn = req.params.isbn;
        if (isbn in books) {
            return res.status(200).json(books[isbn]);
        }
        return res.status(404).json({message: "ISBN not found"});
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)})
    
    myPromise.then((successMessage) => {
        let author = req.params.author;
        Object.keys(books).forEach(function(key, value){
            console.log(books[key]);
            if (books[key].author === author) {
                return res.status(200).json(books[key]);
            }
        });
        return res.status(404).json({message: "Author not found"});
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)})
    
    myPromise.then((successMessage) => {
        let title = req.params.title;
        Object.keys(books).forEach(function(key, value){
            console.log(books[key]);
            if (books[key].title === title) {
                return res.status(200).json(books[key]);
            }
        });
        return res.status(404).json({message: "Title not found"});
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if (isbn in books) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({message: "ISBN not found"});
});

module.exports.general = public_users;
