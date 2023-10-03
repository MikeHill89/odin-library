const addBookButton = document.querySelector(".addbook");
const bookDialog = document.getElementById("bookDialog");
const bookContainer = document.querySelector(".book-container");
const selectEl = document.querySelector("select");
const confirmBookBtn = document.querySelector("#confirmBookBtn");
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

function displayBooks(){

    myLibrary.forEach((book, index) => {
        // Create a card element
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.setAttribute("data-position", index)
        // Create a heading element for the book title
        const title = document.createElement("h4");
        title.textContent = book.title;

        // Create a paragraph element for the book author
        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        // Create a paragraph element for the book pages
        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        // Create a paragraph element for the book status
        const status = document.createElement("p");
        status.textContent = `Read: ${book.status}`;
        // Create a button element to remove the card
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            // Remove the card from the UI
            card.remove();

            // Remove the corresponding book from the myLibrary array
            myLibrary.splice(index, 1);
            // Update the data-position attribute of the remaining cards
            bookContainer.querySelectorAll(".book-card").forEach((card, updatedPosition) => {
                card.setAttribute("data-position", updatedPosition);
            });
            console.log(myLibrary)
        });

        // Append the title, author, pages, and status elements to the card element
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(removeButton);

        // Append the card element to the bookContainer element
        bookContainer.appendChild(card);
    });
}

addBookButton.addEventListener("click", () => {
    bookDialog.showModal();
});


bookDialog.addEventListener("submit", function (event) {
    event.preventDefault();
    bookDialog.close();
    let booktitle = document.getElementById("booktitle").value;
    let bookauthor = document.getElementById("bookauthor").value;
    let bookpages = document.getElementById("bookpages").value;
    let bookstatus = "to be worked on";

    const createBook = new Book(booktitle,bookauthor,bookpages,bookstatus);
    myLibrary.push(createBook);
    console.log("This book has now been added in the library: " +createBook.returnBookInfo());
    const confirmationMsg = createBook.returnBookInfo(); 
    displayBooks();
    return myLibrary; 
});
