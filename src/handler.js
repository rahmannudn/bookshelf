const { nanoid } = require("nanoid");
const books = require("./books");

const addBook = function (req, h) {
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
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return response;
  }

  const insertedAt = new Date().toISOString();
  const newBook = {
    id: nanoid(16),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt: insertedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === newBook.id).length > 0;
  if (!isSuccess) {
    const response = h
      .response({
        status: "fail",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
    return response;
  }

  const response = h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newBook.id,
      },
    })
    .code(201);
  return response;
};

const getAllBooks = function (req, h) {
  const returnedValue = books.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));

  const response = h
    .response({
      status: "success",
      data: { books: returnedValue },
    })
    .code(200);
  return response;
};

const getDetailBook = function (req, h) {
  const { id } = req.params;
  const searchedBook = books.filter((book) => book.id === id)[0];

  if (!searchedBook) {
    const response = h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
    return response;
  }

  const response = h
    .response({
      status: "success",
      data: {
        book: searchedBook,
      },
    })
    .code(200);
  return response;
};

const editBook = function (req, h) {
  const { id } = req.params;
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
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    const response = h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
    return response;
  }

  if (!name) {
    const response = h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);

    return response;
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    updatedAt: new Date().toISOString(),
  };
  const response = h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
    })
    .code(200);
  return response;
};

const deleteBook = function (req, h) {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    const response = h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
    return response;
  }
  books.splice(bookIndex, 1);
  const response = h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
  return response;
};

module.exports = { addBook, getAllBooks, getDetailBook, editBook, deleteBook };
