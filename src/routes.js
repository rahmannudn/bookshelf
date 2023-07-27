/* eslint-disable quotes */
const {
  addBook,
  getAllBooks,
  getDetailBook,
  editBook,
  deleteBook,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getDetailBook,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBook,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBook,
  },
  {
    method: "*",
    path: "/books",
    handler: () => "halaman ini tidak dapat diakses dengan method tersebut",
  },
  {
    method: "*",
    path: "/{any*}",
    handler: () => "halaman tidak ditemukan",
  },
];

module.exports = routes;
