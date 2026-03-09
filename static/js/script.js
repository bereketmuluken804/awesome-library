let myLibrary = [];

function Book(title, author, pages, bookStat){
    if(!new.target){
        throw error("Use 'new' to create an object!")
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages
    this.bookStat = bookStat;
}
book = new Book("My Book", "me", 120, "Read");
myLibrary.push(book);

function addBookToLibrary(title, author, pages, bookStat){
    newBook = new Book(title,  author, pages, bookStat);
    myLibrary.push(newBook);
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card")
    bookCard.innerHTML = `
                    <div class="book-content">
                        <h2 class="book-title">${newBook.title}</h2>
                        <h3 class="book-author">By: ${newBook.author}</h3>
                        <p calss="book-page">Pages: ${newBook.pages}</p>
                        <p class="book-stat">${newBook.bookStat}</p>
                    </div>
                    <div class="controls">
                        <button class="read-mark">Mark Unread</button>
                        <button class="edit">Edit</button>
                        <button class="remove-book" id=${newBook.id}>Remove</button>
                    </div>
    `
    bookContainer.appendChild(bookCard);
    return;
}

const bookContainer = document.querySelector(".book-container");

// displaying books inside library
for (book of myLibrary){
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card")
    bookCard.innerHTML = `
                    <div class="book-content">
                        <h2 class="book-title">${book.title}</h2>
                        <h3 class="book-author">By: ${book.author}</h3>
                        <p calss="book-page">Pages: ${book.pages}</p>
                        <p class="book-stat" id=${book.id}>${book.bookStat}</p>
                    </div>
                    <div class="controls">
                        <button class="read-mark">Mark Unread</button>
                        <button class="edit">Edit</button>
                        <button class="remove-book">Remove</button>
                    </div>
    `
    bookContainer.appendChild(bookCard);
}

const addBook = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const cancel = document.querySelector(".cancel-btn");
const form = document.querySelector("#form");


addBook.addEventListener("click", () =>{
    dialog.showModal();
});


dialog.addEventListener('click', (e)=>{
    const dialogDimensions = dialog.getBoundingClientRect();
    if(
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ){
        dialog.close()
    }
})

cancel.addEventListener('click', (e)=>{
    dialog.close()
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();  // prevent the page from reloading and lose the data
    data = new FormData(form); 
    title = data.get("title");
    author = data.get("author");
    pages = data.get("pages")
    bookStat = data.get("stat");
    if (bookStat !== "Read"){
        bookStat = "Unread";
    }
    addBookToLibrary(title, author, pages, bookStat);
    dialog.close()
})