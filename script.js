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
  //   this.title = title;
  //   this.author = author;
  //   this.pages = pages;
  //   this.read = read;
  this.info = function () {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.read
    );
  };
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let form = document.querySelector("form");
  form.reset();
  const book = new Book();
  book.title = Object.fromEntries(formData).title;
  book.author = Object.fromEntries(formData).author;
  book.pages = Object.fromEntries(formData).pages;
  book.read = Object.fromEntries(formData).read;
  myLibrary.push(book);
  console.log(myLibrary);
});
