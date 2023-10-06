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
Book.prototype.toggleReadStatus = function () {
    // Toggle the read status between "Read" and "Not Read"
    this.status = this.status === "Read" ? "Not Read" : "Read";
};

function displayBooks(){
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }
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
        const toggleStatusButton = document.createElement("button");
        toggleStatusButton.textContent = book.status === "Read" ? "Not Finished" : "Finish Book";
        toggleStatusButton.addEventListener("click", () => {
            // Toggle the read status when the button is clicked
            book.toggleReadStatus();
            // Update the UI to reflect the new status
            status.textContent = `Status: ${book.status}`;
            // Update the button text based on the new status
            toggleStatusButton.textContent = book.status === "Read" ? "Not Finished" : "Finish Book";

            // Update the myLibrary array with the new status
            const index = parseInt(card.getAttribute("data-position"));
            myLibrary[index].status = book.status;
        });
       // Append the title, author, pages, and status elements to the card element
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(toggleStatusButton);
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

    if (event.submitter.id === "confirmBookBtn") {
        // Submit button was clicked, add the book to the library
        let booktitle = document.getElementById("booktitle").value;
        let bookauthor = document.getElementById("bookauthor").value;
        let bookpages = document.getElementById("bookpages").value;
        let bookstatus = document.querySelector("#bookstatus option:checked").value;

        const createBook = new Book(booktitle, bookauthor, bookpages, bookstatus);
        myLibrary.push(createBook);
        console.log("This book has now been added in the library: " + createBook.returnBookInfo());
        displayBooks();
        booktitle = "";
        bookauthor = "";
        bookpages = "";
        bookstatus = "";
    }

    // Close the dialog in both cases
    bookDialog.close();
});
