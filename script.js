const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog > button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let form = document.querySelector("form");
  form.reset();

  //create Book
  const book = new Book();
  book.title = Object.fromEntries(formData).title;
  book.author = Object.fromEntries(formData).author;
  book.pages = Object.fromEntries(formData).pages;
  book.read = Object.fromEntries(formData).read;

  //add Book to array
  myLibrary.push(book);

  displayBooks(myLibrary);
});

function displayBooks(myLibrary) {
  const container = document.querySelector(".container");
  container.replaceChildren(); // clears all books on DOM
  for (let book of myLibrary) {
    addBook(book, myLibrary.indexOf(book));
  }
}

function addBook(book, index) {
  //add book to DOM
  const container = document.querySelector(".container");
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;
  const title = book.title;
  const author = book.author;
  const pages = book.pages;
  card.textContent = title + "\n" + author + "\n" + pages + "\n";
  container.appendChild(card);

  //toggle read button
  const read = document.createElement("button");
  read.className = "read";
  read.textContent = book.read;
  if (book.read === "read") read.style.backgroundColor = "green";
  else read.style.backgroundColor = "red";
  card.appendChild(read);
  read.addEventListener("click", function (e) {
    book.toggleRead(book);
    displayBooks(myLibrary);
  });

  //remove button
  const remove = document.createElement("button");
  remove.className = "remove";
  remove.textContent = "Remove";
  card.appendChild(remove);
  remove.addEventListener("click", function (e) {
    card.remove();
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  });
}

Book.prototype.toggleRead = function (book) {
  if (this.read === "read") this.read = "not read";
  else this.read = "read";
};
