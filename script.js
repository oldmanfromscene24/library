const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + div > button");
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
  card.dataset.index = index;
  card.className = "card";
  container.appendChild(card);

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = "TITLE: " + book.title;
  card.appendChild(title);

  const author = document.createElement("div");
  author.className = "author";
  author.textContent = "AUTHOR: " + book.author;
  card.appendChild(author);

  const pages = document.createElement("div");
  pages.className = "pages";
  pages.textContent = "PAGES: " + book.pages;
  card.appendChild(pages);

  const read = document.createElement("div");
  read.className = "read";
  card.appendChild(read);

  const remove = document.createElement("div");
  remove.className = "remove";
  card.appendChild(remove);

  //toggle read button
  const readButton = document.createElement("button");
  readButton.className = "readButton";
  readButton.textContent = book.read;
  if (book.read === "read") readButton.style.backgroundColor = "lightgreen";
  else readButton.style.backgroundColor = "lightcoral";
  read.appendChild(readButton);
  readButton.addEventListener("click", function (e) {
    book.toggleRead(book);
    displayBooks(myLibrary);
  });

  //remove button
  const removeButton = document.createElement("button");
  removeButton.className = "removeButton";
  removeButton.textContent = "X";
  remove.appendChild(removeButton);
  removeButton.addEventListener("click", function (e) {
    card.remove();
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  });
}

Book.prototype.toggleRead = function (book) {
  if (this.read === "read") this.read = "not read";
  else this.read = "read";
};
