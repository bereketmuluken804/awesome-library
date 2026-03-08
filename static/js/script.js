let myLibrary = [];

function Book(title, author, bookStat){
    if(!new.target){
        throw error("Use 'new' to create an object!")
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.bookStat = bookStat;
}
book = new Book("My Book", "me", "Read");
myLibrary.push(book);

function addBookToLibrary(){
    title = prompt("title: ");
    author = prompt("author: ");
    bookStat = prompt("Have you read the book?: ");
    newBook = new Book(title, author, bookStat);
    myLibrary.push(newBook);
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card")
    bookCard.setAttribute("id", newBook.id)
    bookCard.innerHTML = `
                    <div class="book-content">
                        <h2 class="book-title">${newBook.title}</h2>
                        <h3 class="book-author">By: ${newBook.author}</h3>
                        <p class="book-stat">${newBook.bookStat}</p>
                    </div>
                    <div class="controls">
                        <button class="read-mark">Mark Unread</button>
                        <button class="edit">Edit</button>
                        <button class="remove-book">Remove</button>
                    </div>
    `
    bookContainer.appendChild(bookCard);
    return;
}

addBook = document.querySelector(".add");
addBook.addEventListener("click", () =>{
    addBookToLibrary();
});

const bookContainer = document.querySelector(".book-container");

// displaying books inside library
for (book of myLibrary){
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card")
    bookCard.setAttribute("id", book.id)
    bookCard.innerHTML = `
                    <div class="book-content">
                        <h2 class="book-title">${book.title}</h2>
                        <h3 class="book-author">By: ${book.author}</h3>
                        <p class="book-stat">${book.bookStat}</p>
                    </div>
                    <div class="controls">
                        <button class="read-mark">Mark Unread</button>
                        <button class="edit">Edit</button>
                        <button class="remove-book">Remove</button>
                    </div>
    `
    bookContainer.appendChild(bookCard);
}
