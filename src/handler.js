const { nanoid } = require("nanoid");
const books = require("./books");

function addBook(req, h) {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari readCount",
      })
      .code(400);
    return response;
  }

  const newNote = {
    id: nanoid(16),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: false,
    reading,
    insertedAt: new Date().toISOString(),
    updatedAt: this.insertedAt,
  };
  books.push(newNote);

  const isSuccess = books.filter((note) => note.id === newNote.id).length > 0;
  if (!isSuccess) {
    const response = h
      .response({
        status: "fail",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
    return response;
  }

  // curl -X POST -H "Content-Type: application/json" -d '{"name": "aman", "year": 2015, "author" : "aman jago", pageCount : 200, readPage : 150, "reading":false}' http://localhost/9000/bookss

  // ketika isSucces bernilai true
  const response = h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newNote.id,
      },
    })
    .code(201);
  return response;
}

function getAllBooks() {
  h.response({});
}

module.exports = { addBook, getAllBooks };
