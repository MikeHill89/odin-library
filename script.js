const myLibrary = [];

//constructor of book objects, creates instances of Book
function Book(title,author,pages,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

Book.prototype.returnBookInfo = function () {
    return `Title: ${this.title}, written by ${this.author}, Pages: ${this.pages}, Read: ${this.status}.`;
};

function addBookToLibrary(){
    //do stuff here
    let booktitle = prompt("What is the title of the book?:");
    let bookauthor = prompt("Who is the author of the book?:")
    let bookpages = prompt("How many pages is the book?:")
    let bookstatus = prompt("Have you completed the book?:")

    const createBook = new Book(booktitle,bookauthor,bookpages,bookstatus);
    myLibrary.push(createBook);
    console.log("This book has now been added in the library: " +createBook.returnBookInfo());
    const confirmationMsg = createBook.returnBookInfo(); 
    return myLibrary; 
};