let myLibrary = [];
let bookId;
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
    displayBooks();
}

function editBook(id, title, author, pages) {
    for (let book of myLibrary){
        if(id === book.id){
            book.title = title;
            book.author = author;
            book.pages = pages;
        }
    }
}

function removeBook(id){
    for (let book of myLibrary){
        const i = myLibrary.findIndex(book => book.id === id);
        if(i > -1){
            myLibrary.splice(i, 1);
        }
    }
}
const bookContainer = document.querySelector(".book-container");
const statbox = document.querySelector(".stat-content");
const bookNo = document.querySelector(".book-nos");
const readBooks = document.querySelector(".read");
const unreadBooks = document.querySelector(".unread");
// displaying books inside library
function displayBooks(){
    bookContainer.replaceChildren()
    read_no=0;
    for (let book of myLibrary){
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card")
        bookCard.setAttribute("book-id", book.id);
        stat = book.bookStat === "Read" ? "Unread" : "Read"
        bookCard.innerHTML = `
                        <div class="book-content">
                            <h2 class="book-title">${book.title}</h2>
                            <h3 class="book-author">By: ${book.author}</h3>
                            <p class="book-page">Pages: ${book.pages}</p>
                            <p class="book-stat" >${book.bookStat}</p>
                        </div>
                        <div class="controls">
                            <button class="read-mark">Mark ${stat}</button>
                            <button class="edit">Edit</button>
                            <button class="remove-book">Remove</button>
                        </div>
        `
        if(book.bookStat === "Read"){
            read_no += 1;
        }
        bookContainer.appendChild(bookCard);

        const markbtn = bookCard.querySelector(".read-mark");
        markbtn.addEventListener('click', (e) => {
            book.bookStat = book.bookStat === "Read" ? "Unread" :"Read";
            e.target.parentNode.previousElementSibling.lastElementChild.textContent = book.bookStat;
            e.target.textContent = `Mark ${book.bookStat === "Read" ? "Unread" :"Read"}`;
            displayBooks()
        })

        const edit = bookCard.querySelector(".edit")
        edit.addEventListener('click', (e)=>{
            editDialog.showModal();
            bookId = e.target.parentNode.parentNode.getAttribute("book-id")
        })
        bookNo.textContent = `Total: ${myLibrary.length}`;
        readBooks.textContent = `Read: ${read_no}`;
        unreadBooks.textContent = `Unread: ${myLibrary.length - read_no}`;
}
}


const addBook = document.querySelector(".add");
const dialog = document.querySelector("#add-dialog");
const cancel = document.querySelector(".cancel-btn");
const cancleEdit = document.querySelector(".cancel-edit");
const form = document.querySelector("#form-1");
const editForm = document.querySelector("#form-2");
const editDialog = document.querySelector("#edit-dialog");



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
cancleEdit.addEventListener('click', (e)=>{
    editDialog.close();
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();  // prevent the page from reloading and lose the data
    data = new FormData(form); 
    title = data.get("title");
    author = data.get("author");
    pages = data.get("pages");
    bookStat = data.get("stat");
    if (bookStat !== "Read"){
        bookStat = "Unread";
    }

    addBookToLibrary(title, author, pages, bookStat);
    dialog.close()
})

editForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    data = new FormData(editForm);
    title = data.get("title");
    author = data.get("author");
    pages = data.get("pages");
    
    editBook(bookId, title, author, pages);
    editDialog.close()
    displayBooks();

})
const authorinput = document.querySelector("#author");
const titleinput = document.querySelector("#title");

authorinput.addEventListener("input", (e)=>{
    const title = titleinput.value;
    const author = authorinput.value;

    let duplicate = false;
    for(let book of myLibrary){
        if(book.title === title && book.author===author){
            duplicate = true;
        }
    }  
    if(duplicate){
        authorinput.setCustomValidity("A book by same Title and Author Exists.")
    }else {
        authorinput.setCustomValidity("");
    }
})

const bookCont = document.querySelector(".book-container");
bookCont.addEventListener('click', (e)=>{
    if(e.target.textContent === "Remove"){
        bookId = e.target.parentNode.parentNode.getAttribute("book-id")
        confirmDialog.showModal()
    }
    
    
})

const confirmDialog = document.querySelector("#confirm");
confirmDialog.addEventListener('click', (e)=>{
    if(e.target.textContent === "Yes"){
       removeBook(bookId);
       displayBooks();
    }
    confirmDialog.close()
})
displayBooks();
