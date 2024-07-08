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
  // this.info = function () {
  //   return (
  //     this.title +
  //     " by " +
  //     this.author +
  //     ", " +
  //     this.pages +
  //     " pages, " +
  //     this.read
  //   );
  // };
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
  container.replaceChildren()// clears all books on DOM
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
  card.textContent = book.title + " " + index;
  container.appendChild(card);

  //remove button
  const button = document.createElement("button");
  button.textContent = "Remove";
  card.appendChild(button);
  button.addEventListener("click", function (e) {
    card.remove();
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  });
}
