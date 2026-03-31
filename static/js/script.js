let myLibrary = [];
let bookId;
function Book(title, author, pages, bookStat) {
  if (!new.target) {
    throw error("Use 'new' to create an object!");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.bookStat = bookStat;
}
const book1 = new Book("1984", "George Orwell", 328, "Read");
const book2 = new Book(
  "The Catcher in the Rye",
  "J.D. Salinger",
  234,
  "Unread",
);
const book3 = new Book("The Hobbit", "J.R.R. Tolkien", 310, "Read");
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

function addBookToLibrary(title, author, pages, bookStat) {
  newBook = new Book(title, author, pages, bookStat);
  myLibrary.push(newBook);
  displayBooks();
}
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function editBook(id, title, author, pages) {
  for (let book of myLibrary) {
    if (id === book.id) {
      book.title = title;
      book.author = author;
      book.pages = pages;
    }
  }
}

function removeBook(id) {
  for (let book of myLibrary) {
    const i = myLibrary.findIndex((book) => book.id === id);
    if (i > -1) {
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
function displayBooks() {
  bookContainer.replaceChildren();
  read_no = 0;
  if (myLibrary.length === 0) {
    message = document.createElement("h4");
    message.textContent = "Your library is empty, add some books.";
    bookContainer.appendChild(message);
    bookNo.textContent = `Total: ${myLibrary.length}`;
    readBooks.textContent = `Read: ${read_no}`;
    unreadBooks.textContent = `Unread: ${myLibrary.length - read_no}`;
  }
  for (let book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("book-id", book.id);
    stat = book.bookStat === "Read" ? "Unread" : "Read";
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
        `;
    if (book.bookStat === "Read") {
      read_no += 1;
    }
    bookContainer.appendChild(bookCard);

    const markbtn = bookCard.querySelector(".read-mark");
    markbtn.addEventListener("click", (e) => {
      book.bookStat = book.bookStat === "Read" ? "Unread" : "Read";
      e.target.parentNode.previousElementSibling.lastElementChild.textContent =
        book.bookStat;
      e.target.textContent = `Mark ${book.bookStat === "Read" ? "Unread" : "Read"}`;
      displayBooks();
    });

    const edit = bookCard.querySelector(".edit");
    edit.addEventListener("click", (e) => {
      editDialog.showModal();
      bookId = e.target.parentNode.parentNode.getAttribute("book-id");
    });
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

addBook.addEventListener("click", () => {
  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
  });
  dialog.showModal();
});

dialog.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});

cancel.addEventListener("click", (e) => {
  form.reset();
  dialog.close();
});
cancleEdit.addEventListener("click", (e) => {
  editForm.reset();
  editDialog.close();
});

const titleE = document.getElementById("titleError");
const authorE = document.getElementById("authorError");
const pagesE = document.getElementById("pagesError");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the page from reloading and lose the data

  const data = new FormData(form);

  const title = String(data.get("title") ?? "").trim();
  const author = String(data.get("author") ?? "").trim();
  const rawpages = data.get("pages");
  const pages = Number(rawpages);
  const bookStat = data.get("stat") === "Read" ? "Read" : "Unread";

  let valid = true;

  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
  });

  if (!title) {
    titleE.textContent = "This field is required.";
    valid = false;
  }
  if (!author) {
    authorE.textContent = "This field is required.";
    valid = false;
  } else if (!Number.isNaN(Number(author))) {
    authorE.textContent = "Name can't be number";
    valid = false;
  } else if (author.length < 2) {
    authorE.textContent = "Name must be more than 1 letter.";
    valid = false;
  }

  if (!rawpages) {
    pagesE.textContent = "This field is required.";
    valid = false;
  } else if (pages > 10000) {
    pagesE.textContent = "Max page is 10,000";
    valid = false;
  } else if (pages < 1) {
    pagesE.textContent = "Min page is 1";
    valid = false;
  }

  const duplicate = myLibrary.some(
    (book) =>
      book.title.trim().toLowerCase() === title.trim().toLowerCase() &&
      book.author.trim().toLowerCase() === author.trim().toLowerCase(),
  );
  if (valid && duplicate) {
    titleE.textContent = "Book already exists.";
    valid = false;
  }
  if (valid) {
    addBookToLibrary(toTitleCase(title), toTitleCase(author), pages, bookStat);
    form.reset();
    dialog.close();
  }
});
dialog.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    form.requestSubmit();
  }
});
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  data = new FormData(editForm);
  title = data.get("title");
  author = data.get("author");
  pages = data.get("pages");

  editBook(bookId, title, author, pages);
  editForm;
  editDialog.close();
  displayBooks();
});

const bookCont = document.querySelector(".book-container");
bookCont.addEventListener("click", (e) => {
  if (e.target.textContent === "Remove") {
    bookId = e.target.parentNode.parentNode.getAttribute("book-id");
    confirmDialog.showModal();
  }
});

const confirmDialog = document.querySelector("#confirm");
confirmDialog.addEventListener("click", (e) => {
  if (e.target.textContent === "Yes") {
    removeBook(bookId);
    displayBooks();
  }
  confirmDialog.close();
});

displayBooks();
