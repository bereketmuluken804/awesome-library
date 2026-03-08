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
    newBook = new Book(1, title, author, bookStat);
    myLibrary.push(newBook)
    return;
}

addBook = document.querySelector(".add");
addBook.addEventListener("click", () =>{
    addBookToLibrary();
});

bookContainer = document.querySelector(".book-container");
bookdocument.createElement("div");
